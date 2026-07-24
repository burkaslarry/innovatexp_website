"use client";

import { FormEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, localeUsesChineseCopy } from "@/lib/i18n-routing";
import { useInnovateXpM3Theme } from "@/components/questionnaires/useInnovateXpM3Theme";
import { useInquiryCart } from "@/context/InquiryCartContext";
import { formatHkd, type PricingLocale } from "@/content/pricing";
import {
  catalogBlurb,
  getInquiryCatalogItem,
} from "@/content/inquiry-catalog";

function toPricingLocale(locale: string): PricingLocale {
  if (locale === "zh-hk" || locale === "zh-tw" || locale === "ja" || locale === "de") return locale;
  return "en";
}

export function InquiryCheckoutDrawer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const zh = localeUsesChineseCopy(locale);
  const pl = toPricingLocale(locale);
  const theme = useInnovateXpM3Theme();
  const { items, itemCount, estimatedTotal, drawerOpen, setDrawerOpen, removeItem, setQty, clear } =
    useInquiryCart();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setMessage("");
    setError(null);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (items.length === 0) {
      setError(zh ? "請先加入至少一項服務。" : "Add at least one offer to your inquiry.");
      return;
    }
    if (!name.trim() || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(zh ? "請填寫姓名同有效電郵。" : "Please enter your name and a valid email.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          locale,
          sourcePath: pathname,
          items: items.map((line) => ({
            id: line.id,
            title: line.title,
            amountHkd: line.amountHkd,
            qty: line.qty,
          })),
          estimatedTotal,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || (zh ? "提交失敗，請稍後再試或 WhatsApp 聯絡。" : "Submit failed. Try again or WhatsApp us."));
        return;
      }
      setSuccess(true);
      clear();
      resetForm();
    } catch {
      setError(zh ? "網絡錯誤，請稍後再試。" : "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 420 },
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" fontWeight={800}>
              {zh ? "查詢購物車" : "Inquiry cart"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {zh
                ? "揀好服務 → 確認 → 我們會電郵跟進（非即時付款）"
                : "Shortlist offers → confirm → we email you back (not instant payment)"}
            </Typography>
          </Box>
          <IconButton aria-label="Close" onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider />

        {success ? (
          <Alert severity="success" onClose={() => setSuccess(false)}>
            {zh
              ? "已收到你的查詢！我們會盡快電郵／WhatsApp 回覆。"
              : "Inquiry received. We will reply by email / WhatsApp soon."}
          </Alert>
        ) : null}
        {error ? (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        ) : null}

        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {items.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
              {zh
                ? "購物車係空嘅。喺定價卡撳「加入查詢」開始。"
                : "Cart is empty. Tap “Add to inquiry” on any offer card."}
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {items.map((line) => {
                const catalog = getInquiryCatalogItem(line.id);
                return (
                  <Box
                    key={line.id}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      p: 1.5,
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box sx={{ pr: 1 }}>
                        <Typography fontWeight={700}>{line.title}</Typography>
                        {catalog ? (
                          <Typography variant="caption" color="text.secondary">
                            {catalogBlurb(catalog, zh)}
                          </Typography>
                        ) : null}
                        <Typography variant="body2" fontWeight={700} sx={{ mt: 0.5 }}>
                          {formatHkd(line.amountHkd, pl)}
                          {line.qty > 1 ? ` × ${line.qty}` : ""}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        aria-label={zh ? "移除" : "Remove"}
                        onClick={() => removeItem(line.id)}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                      <Button size="small" variant="outlined" onClick={() => setQty(line.id, line.qty - 1)}>
                        −
                      </Button>
                      <Typography variant="body2">{line.qty}</Typography>
                      <Button size="small" variant="outlined" onClick={() => setQty(line.id, line.qty + 1)}>
                        +
                      </Button>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          )}
        </Box>

        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            pt: 2,
          }}
        >
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography fontWeight={700}>
              {zh ? `共 ${itemCount} 項` : `${itemCount} item(s)`}
            </Typography>
            <Typography fontWeight={800} color="primary">
              {formatHkd(estimatedTotal, pl)}
            </Typography>
          </Stack>

          <Box component="form" onSubmit={onSubmit}>
            <Stack spacing={1.5}>
              <TextField
                required
                size="small"
                label={zh ? "姓名" : "Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <TextField
                size="small"
                label={zh ? "公司" : "Company"}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                fullWidth
              />
              <TextField
                required
                size="small"
                type="email"
                label={zh ? "電郵" : "Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <TextField
                size="small"
                label={zh ? "電話／WhatsApp" : "Phone / WhatsApp"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
              <TextField
                size="small"
                label={zh ? "補充說明（可選）" : "Message (optional)"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                multiline
                minRows={2}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={submitting || items.length === 0}
                sx={{ minHeight: 48, fontWeight: 800 }}
              >
                {submitting
                  ? zh
                    ? "提交中…"
                    : "Sending…"
                  : zh
                    ? "確認查詢（電郵至 InnovateXP）"
                    : "Confirm inquiry (email InnovateXP)"}
              </Button>
              <Typography variant="caption" color="text.secondary" textAlign="center">
                {zh
                  ? "提交後會寄到 info@innovatexp.co，屬業務查詢，唔係即時扣款。"
                  : "Sends an inquiry to info@innovatexp.co — not instant payment."}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}
