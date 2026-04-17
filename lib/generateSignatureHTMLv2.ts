export interface SignatureDataV2 {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  website: string;
  photoBase64: string;
  logoUrl: string;
}

export function generateSignatureHTMLv2(data: SignatureDataV2): string {
  const { name, jobTitle, email, phone, website, photoBase64, logoUrl } = data;

  // Icon color #888888, 14px size, inline as data URIs for email compatibility
  const emailIcon = `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='4' width='20' height='16' rx='2'/%3E%3Cpath d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'/%3E%3C/svg%3E" width="14" height="14" style="display:inline-block;vertical-align:middle;" />`;
  const phoneIcon = `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z'/%3E%3C/svg%3E" width="14" height="14" style="display:inline-block;vertical-align:middle;" />`;
  const webIcon = `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M2 12h20'/%3E%3Cpath d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'/%3E%3C/svg%3E" width="14" height="14" style="display:inline-block;vertical-align:middle;" />`;

  const titleLine = jobTitle ? `${jobTitle} · Pro Active` : "Pro Active";

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: Lato, Arial, Helvetica, sans-serif; color: #0A0A0A; border-collapse: collapse;">
  <tr>
    <td style="padding-right: 16px; vertical-align: top;">
      <img src="${photoBase64}"
           width="72" height="72"
           style="border-radius: 50%; object-fit: cover; display: block; width: 72px; height: 72px; border: 2px solid #F8BD30;" />
    </td>
    <td style="vertical-align: top; padding-top: 0;">
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
          <td style="padding-bottom: 8px;">
            <div style="width: 28px; height: 2px; background-color: #F8BD30;"></div>
          </td>
        </tr>
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
              ${email ? `<tr>
                <td style="padding-bottom: 3px; font-size: 11px; font-weight: 400; color: #555555; line-height: 1.4;">
                  ${emailIcon}&nbsp;&nbsp;<a href="mailto:${email}" style="color: #555555; text-decoration: none;">${email}</a>
                </td>
              </tr>` : ""}
              ${phone ? `<tr>
                <td style="padding-bottom: 3px; font-size: 11px; font-weight: 400; color: #555555; line-height: 1.4;">
                  ${phoneIcon}&nbsp;&nbsp;<a href="tel:${phone.replace(/\s/g, "")}" style="color: #555555; text-decoration: none;">${phone}</a>
                </td>
              </tr>` : ""}
              ${website ? `<tr>
                <td style="padding-bottom: 0; font-size: 11px; font-weight: 400; color: #555555; line-height: 1.4;">
                  ${webIcon}&nbsp;&nbsp;<a href="https://${website}" style="color: #555555; text-decoration: none;">${website}</a>
                </td>
              </tr>` : ""}
            </table>
          </td>
        </tr>
      </table>
    </td>
    <td style="vertical-align: bottom; padding-left: 24px;">
      <img src="${logoUrl}" width="140" alt="Pro Active" style="display: block; width: 140px;" />
    </td>
  </tr>
</table>`;
}
