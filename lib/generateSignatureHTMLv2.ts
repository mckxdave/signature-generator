export interface SignatureDataV2 {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  website: string;
  photoBase64: string;
}

export function generateSignatureHTMLv2(data: SignatureDataV2): string {
  const { name, jobTitle, email, phone, website, photoBase64 } = data;

  const titleLine = jobTitle ? `${jobTitle} · Pro Active` : "Pro Active";

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: Lato, Arial, Helvetica, sans-serif; color: #0A0A0A; border-collapse: collapse;">
  <tr>
    <td style="padding-right: 16px; vertical-align: middle;">
      <img src="${photoBase64}"
           width="96" height="96"
           style="border-radius: 50%; object-fit: cover; display: block; width: 96px; height: 96px;" />
    </td>
    <td style="vertical-align: middle; padding-top: 0;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr>
          <td style="padding-bottom: 1px;">
            <span style="font-size: 14px; font-weight: 700; color: #0A0A0A; line-height: 1.3;">${name}</span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 6px;">
            <span style="font-size: 11px; font-weight: 400; color: #555555; line-height: 1.4;">${titleLine}</span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 8px; line-height: 0; font-size: 0;">
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
              <tr>
                <td style="width: 28px; height: 2px; line-height: 2px; font-size: 0; background-color: #F8BD30;">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
              ${email ? `<tr>
                <td style="padding-bottom: 3px; font-size: 11px; font-weight: 400; color: #555555; line-height: 1.4;">
                  <a href="mailto:${email}" style="color: #555555; text-decoration: none;">${email}</a>
                </td>
              </tr>` : ""}
              ${phone ? `<tr>
                <td style="padding-bottom: 3px; font-size: 11px; font-weight: 400; color: #555555; line-height: 1.4;">
                  <a href="tel:${phone.replace(/\s/g, "")}" style="color: #555555; text-decoration: none;">${phone}</a>
                </td>
              </tr>` : ""}
              ${website ? `<tr>
                <td style="padding-bottom: 0; font-size: 11px; font-weight: 400; color: #555555; line-height: 1.4;">
                  <a href="https://${website}" style="color: #555555; text-decoration: none;">${website}</a>
                </td>
              </tr>` : ""}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}
