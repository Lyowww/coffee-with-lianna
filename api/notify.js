const TO_EMAIL = "lyova.h1.g@gmail.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  const when = new Date().toLocaleString("hy-AM", {
    timeZone: "Asia/Yerevan",
    dateStyle: "full",
    timeStyle: "short",
  });

  const subject = "Հաստատում · Լիանան կգա սուրճի";
  const message = [
    "Բարև Լյովա,",
    "",
    "Լիանան հենց նոր հաստատեց հրավերը։",
    "Նա սեղմել է «Կգամ» կոճակը։",
    "",
    "Վաղվա սուրճը հաստատված է։",
    "",
    `Ժամանակը (Երևան)՝ ${when}`,
  ].join("\n");

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${TO_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "box",
        _captcha: "false",
        name: "Լիանա",
        email: TO_EMAIL,
        message,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return res.status(502).json({ ok: false, detail });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false });
  }
}
