import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = process.argv[2] || "/tmp/artkal-palettes";
const outFile = join(__dirname, "../src/data/artkal-palette.json");

const NAME_FIX = {
  "Ghost While": "Ghost White",
  "Drark Algae": "Dark Algae",
  Wegdewood: "Wedgewood Blue",
  "Wegdewood Blue": "Wedgewood Blue",
  Caribbian: "Caribbean Blue",
  "Caribbian Blue": "Caribbean Blue",
  Marsmallow: "Marshmallow Rose",
  "Marsmallow Rose": "Marshmallow Rose",
  Fuschia: "Fuchsia",
  Cobolt: "Cobalt",
  "Key Lomen Pie": "Key Lemon Pie",
  "Bubble Gun": "Bubble Gum",
  "Transparent Tangering": "Transparent Tangerine",
  "Caffe Latté": "Caffe Latte",
  "Ash Grey": "Ash Gray",
  "Steel Grey": "Steel Gray",
  "Iron Grey": "Iron Gray",
};

const ZH_NAMES = {
  White: "白色",
  Black: "黑色",
  "Burning Sand": "燃沙粉",
  Tangerine: "柑橘色",
  Orange: "橙色",
  "Tall Poppy": "罌粟紅",
  "Raspberry Pink": "覆盆子粉",
  Gray: "灰色",
  Emerald: "祖母綠",
  "Dark Green": "深綠",
  "Baby Blue": "嬰兒藍",
  "Dark Blue": "深藍",
  "Pastel Lavender": "粉紫",
  Sandstorm: "沙塵黃",
  Redwood: "紅木色",
  Brown: "棕色",
  "Light Brown": "淺棕",
  Sand: "沙色",
  "Bubble Gum": "泡泡糖粉",
  Green: "綠色",
  "Pastel Green": "粉綠",
  Purple: "紫色",
  "Royal Purple": "皇家紫",
  "True Blue": "正藍",
  "Hot Pink": "亮粉紅",
  Magenta: "洋紅",
  Yellow: "黃色",
  "Lily Pink": "百合粉",
  "Pastel Yellow": "粉黃",
  "Shadow Green": "影綠",
  "Sea Mist": "海霧綠",
  Beeswax: "蜂蠟色",
  Maverick: "淡丁香",
  Red: "紅色",
  "Mona Lisa": "蒙娜麗莎粉",
  "Old Pink": "古典粉",
  "Blue-Green": "藍綠色",
  Burgundy: "酒紅",
  "Yellow Orange": "橙黃",
  "Carnation Pink": "康乃馨粉",
  Copper: "銅色",
  Silver: "銀色",
  "Dark Gray": "深灰",
  "Sky Blue": "天藍",
  "Medium Turquoise": "中土耳其藍",
  "Bright Green": "亮綠",
  Marigold: "金盞花",
  Corn: "玉米黃",
  "Mulberry Wood": "桑木紫",
  "Mandys Pink": "曼蒂粉",
  "Spring Sun": "春日陽",
  Picasso: "畢卡索黃",
  Turquoise: "土耳其藍",
  "Light Blue": "淺藍",
  Pistachio: "開心果綠",
  "Bright Carrot": "胡蘿蔔橙",
  Buccaneer: "海盜棕紅",
  Paprika: "辣椒紅",
  "Butterfly Bush": "醉魚草紫",
  Lavender: "薰衣草",
  "Key Lemon Pie": "檸檬批黃",
  "Green Tea": "綠茶",
  "Metallic Gold": "金屬金",
  "Black Rock": "黑岩藍",
  Canary: "金絲雀黃",
  "Blaze Orange": "火焰橙",
  Vanilla: "香草",
  Tan: "茶色",
  "Mine Shaft": "礦井灰",
  "Dark Algae": "深藻綠",
  "Jade Green": "翡翠綠",
  "Light Sea Blue": "淺海藍",
  "Steel Blue": "鋼藍",
  Azure: "蔚藍",
  "Dark Steel Blue": "深鋼藍",
  "Sea Blue": "海藍",
  "Ghost White": "幽靈白",
  "Ash Gray": "灰白",
  "Light Gray": "淺灰",
  "Dark Olive": "深橄欖",
  Deer: "鹿棕",
  Clay: "陶土",
  Sienna: "赭石",
  "Deep Chestnut": "深栗",
  "Red Wine": "紅酒色",
  Goldenrod: "金麒麟",
  "Coral Red": "珊瑚紅",
  "Dark Pink": "深粉",
  "Charcoal Gray": "炭灰",
  "Pastel Orange": "粉橘",
  "Brunswick Green": "不倫瑞克綠",
  Dandelion: "蒲公英黃",
  "Pale Skin": "淺膚色",
  "Warm Blush": "暖腮紅",
  Salmon: "鮭魚色",
  Apricot: "杏色",
  Papaya: "木瓜橙",
  "Himalaya Blue": "喜馬拉雅藍",
  Waterfall: "瀑布藍",
  Lagoon: "潟湖藍",
  "Electric Blue": "電光藍",
  "Pool Blue": "泳池藍",
  "Caribbean Blue": "加勒比藍",
  "Deep Water": "深水藍",
  "Petrol Blue": "石油藍",
  "Wedgewood Blue": "韋奇伍德藍",
  "Pond Blue": "池塘藍",
  "Seashell Beige": "貝殼米",
  Beige: "米色",
  "Beach Beige": "沙灘米",
  "Caffe Latte": "咖啡拿鐵",
  "Oaktree Brown": "橡樹棕",
  Khaki: "卡其",
  "Light Greengray": "淺綠灰",
  "Mossy Green": "苔綠",
  "Earth Green": "大地綠",
  "Sage Green": "鼠尾草綠",
  "Pinetree Green": "松樹綠",
  "Frosty Blue": "霜藍",
  "Polar Mint": "極地薄荷",
  "Celadon Green": "青瓷綠",
  Eucalyptus: "尤加利綠",
  "Clover Field": "三葉草綠",
  "Pooltable Felt": "撞球檯綠",
  "Snake Green": "蛇綠",
  "Dark Eucalyptus": "深尤加利",
  "Marshmallow Rose": "棉花糖玫瑰",
  "Light Grape": "淺葡萄紫",
  "Rosebud Pink": "玫瑰蕾粉",
  Fuchsia: "品紅",
  "Candy Violet": "糖果紫",
  Flamingo: "火烈鳥粉",
  "Pink Plum": "粉梅",
  Amethyst: "紫水晶",
  "Moonlight Blue": "月光藍",
  "Summer Rain": "夏雨藍",
  "Azur Blue": "碧藍",
  "Cornflower Blue": "矢車菊藍",
  "Forget Me Not": "勿忘我藍",
  Indigo: "靛藍",
  "Horizon Blue": "地平線藍",
  Cobalt: "鈷藍",
  "Royal Blue": "寶藍",
  Marine: "海軍藍",
  "Pale Yellow Moss": "淺黃苔",
  "Bloodrose Red": "血玫瑰紅",
  Spearmint: "留蘭香綠",
  Mocha: "摩卡",
  Creme: "奶油色",
  "Iris Violet": "鳶尾紫",
  "Forrest Green": "森林綠",
  Lilac: "丁香紫",
  "Pale Lilac": "淺丁香",
  "Sahara Sand": "撒哈拉沙",
  "Sunkissed Teint": "日光膚色",
  "Steel Gray": "鋼灰",
  "Iron Gray": "鐵灰",
  Pepper: "胡椒黑",
  "Oslo Gray": "奧斯陸灰",
  Moon: "月光白",
  Raincloud: "雨雲藍",
  Winter: "冬日藍",
  Tide: "潮汐藍",
  Aquamarine: "海藍寶",
  Neptune: "海王藍",
  "Rose Quartz": "粉晶",
  Mauve: "藕荷色",
  "Dark Mauve": "深藕荷",
  "Wild Berry": "野莓紫",
  "Sugar Plum": "糖梅紫",
  Desert: "沙漠色",
  Peanut: "花生色",
  Toffee: "太妃糖",
  Bark: "樹皮色",
  "Glow Yellow": "夜光黃",
  "Glow Pink": "夜光粉",
  "Glow Blue": "夜光藍",
  "Glitter Blue": "閃粉藍",
  "Glitter Green": "閃粉綠",
  "Glitter Red": "閃粉紅",
  "Glitter Yellow": "閃粉黃",
  "Neon Orange": "螢光橙",
  "Neon Green": "螢光綠",
  "Neon Yellow": "螢光黃",
  "Neon Rose": "螢光玫紅",
  "Pearlescent Green": "珠光綠",
  "Pearlescent Tangerine": "珠光柑橘",
  "Pearlescent Orange": "珠光橙",
  "Pearlescent Pink": "珠光粉",
  "Pearlescent Red": "珠光紅",
  "Pearlescent Blue": "珠光藍",
  "Pearlescent Purple": "珠光紫",
  "Pearlescent White": "珠光白",
  Transparent: "透明",
  "Transparent Pink": "透明粉",
  "Transparent Tangerine": "透明柑橘",
  "Transparent Yellow": "透明黃",
  "Transparent Green": "透明綠",
  "Transparent Purple": "透明紫",
};

const FAMILY_ZH = {
  A: "黃色系",
  B: "綠色系",
  C: "藍色系",
  D: "紫色系",
  E: "粉色系",
  F: "紅色系",
  G: "膚色／棕色系",
  H: "中性色",
  M: "霧彩色",
};

const FAMILY_EN = {
  A: "Yellow",
  B: "Green",
  C: "Blue",
  D: "Purple",
  E: "Pink",
  F: "Red",
  G: "Skin / Brown",
  H: "Neutral",
  M: "Muted",
};

function toHex(r, g, b) {
  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

function parseCsv(text) {
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) => {
      const [code, name, r, g, b] = line.split(",");
      return {
        code: code.trim(),
        name: (name || code).trim(),
        r: Number(r),
        g: Number(g),
        b: Number(b),
      };
    })
    .filter((row) => row.code && Number.isFinite(row.r));
}

function displayName(raw) {
  return NAME_FIX[raw] || raw;
}

function namedColor(series, code, rawName, r, g, b) {
  const name = displayName(rawName);
  return {
    brand: "Artkal",
    series,
    code,
    name,
    zhName: ZH_NAMES[name] || name,
    hex: toHex(r, g, b),
    rgb: [r, g, b],
  };
}

function familyColor(code, r, g, b) {
  const letter = code.replace(/[0-9]/g, "");
  const enFamily = FAMILY_EN[letter] || "Color";
  const zhFamily = FAMILY_ZH[letter] || "色系";
  const isSkin = letter === "G" || (letter === "H" && Number(code.slice(1)) <= 2);
  return {
    brand: "Artkal",
    series: "A",
    code,
    name: isSkin && letter === "G" ? `Skin ${code}` : `${enFamily} ${code}`,
    zhName: letter === "G" ? `膚色 ${code}` : letter === "H" ? `中性 ${code}` : `${zhFamily} ${code}`,
    hex: toHex(r, g, b),
    rgb: [r, g, b],
  };
}

const sRows = parseCsv(readFileSync(join(srcDir, "artkal_s.csv"), "utf8"));
const aRows = parseCsv(readFileSync(join(srcDir, "artkal_a.csv"), "utf8"));
const cRows = parseCsv(readFileSync(join(srcDir, "artkal_c.csv"), "utf8"));
const mRows = parseCsv(readFileSync(join(srcDir, "artkal_m.csv"), "utf8"));

const palette = [
  ...sRows.map((row) => namedColor("S", row.code, row.name, row.r, row.g, row.b)),
  ...aRows.map((row) => namedColor("A", row.code, row.name, row.r, row.g, row.b)),
  ...cRows.map((row) => namedColor("C", row.code, row.name, row.r, row.g, row.b)),
  ...mRows.map((row) => familyColor(row.code.replace(/^M/, ""), row.r, row.g, row.b)),
];

const seen = new Set();
const unique = palette.filter((color) => {
  const key = `${color.series}:${color.code}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(unique, null, 2)}\n`);
console.log(`Wrote ${unique.length} colors to ${outFile}`);
console.log(
  Object.fromEntries(
    ["S", "A", "C"].map((series) => [series, unique.filter((c) => c.series === series).length]),
  ),
);
