/* Validate emitted route schemas, rather than requiring marketing keywords. */
import assert from "node:assert/strict";
import { tsImport } from "tsx/esm/api";

const { buildStructuredData } = await tsImport("../src/app/components/StructuredData.tsx", import.meta.url);
const { getSiteUrl } = await tsImport("../src/lib/site-url.ts", import.meta.url);
const { serializeJsonLd } = await tsImport("../src/lib/schema.ts", import.meta.url);
const { AUTHOR } = await tsImport("../src/lib/author.ts", import.meta.url);
const { getHomepageContent } = await tsImport("../src/content/homepage.ts", import.meta.url);

const siteUrl = getSiteUrl();
const locales = ["en", "zh-hk", "zh-tw", "ja", "de"];
const paths = ["", "/smartsales-crm", "/eventxp", "/ai-consulting", "/ai-seo-update-package", "/bookme", "/blog"];
let checked = 0;

for (const locale of locales) {
  for (const path of paths) {
    const route = `/${locale}${path}`;
    const nodes = buildStructuredData(route);
    const serialized = serializeJsonLd(nodes);
    assert.ok(!serialized.includes("<"), `${route}: unsafe JSON-LD serialization`);
    const graph = JSON.parse(serialized);
    const ids = graph.flatMap((node) => node["@id"] ? [node["@id"]] : []);
    assert.equal(new Set(ids).size, ids.length, `${route}: duplicate entity definitions`);
    const organization = graph.find((node) => node["@id"] === `${siteUrl}/#organization`);
    const founder = graph.find((node) => node["@id"] === `${siteUrl}/#founder`);
    assert.deepEqual(organization.sameAs, [AUTHOR.linkedInCompany]);
    assert.deepEqual(founder.sameAs, [AUTHOR.linkedInPersonal]);
    assert.equal(organization.founder["@id"], founder["@id"]);
    assert.equal(founder.worksFor["@id"], organization["@id"]);
    assert.doesNotMatch(serialized, /"(?:HowTo|HowToStep|SpeakableSpecification|speakable|telephone)"/);
    const faqs = graph.filter((node) => node["@type"] === "FAQPage");
    assert.equal(faqs.length, path === "" ? 1 : 0, `${route}: unexpected FAQ scope`);
    if (path === "") {
      assert.deepEqual(faqs[0].mainEntity.map((item) => ({ question: item.name, answer: item.acceptedAnswer.text })), getHomepageContent(locale).faq.items);
    }
    checked += 1;
  }
}

const hostile = { text: "</script><script>alert(1)</script>" };
assert.ok(!serializeJsonLd(hostile).includes("<"));
assert.deepEqual(JSON.parse(serializeJsonLd(hostile)), hostile);
console.log(`Schema validation passed (${checked} localized route graphs).`);
