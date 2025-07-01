import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { GetLanguage } from "@redux-state/selectors";
import Footer from '@components/Footer';

const PrivacyPolicy = () => {
  const language = GetLanguage();
  const rtl = language === "ar";
  const currentDateTime = new Date();

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          mt: 14,
          mb: 4,
          // Add RTL compatibility
          direction: rtl ? "rtl" : "ltr",
          textAlign: rtl ? "right" : "left",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {/* Title */}
          <Typography variant="h4" gutterBottom>
            {rtl ? "سياسة الخصوصية" : "Privacy Policy"}
          </Typography>

          {/* Effective Date */}
          <Typography variant="subtitle1" gutterBottom>
            {rtl ? "تاريخ السريان: " : "Effective Date: "}
            <strong>{currentDateTime.toLocaleDateString()}</strong>
          </Typography>

          {/* Intro Paragraph */}
          <Typography paragraph>
            {rtl
              ? `إن HM Awani (والذي يُشار إليه فيما يلي بـ "نحن" أو "لنا" أو "لدينا") ملتزم بحماية واحترام خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند زيارتك لموقعنا الإلكتروني `
              : `HM Awani (hereinafter referred to as "we," "our," or "us") is
            committed to protecting and respecting your privacy. This Privacy
            Policy explains how we collect, use, and protect your personal
            information when you visit our website `}
            <a
              href="https://hmawani.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ direction: "ltr" }} // Ensure the link displays correctly even in RTL
            >
              https://hmawani.com/
            </a>
            {rtl
              ? ` ("الموقع") وإجراء عمليات الشراء، بما في ذلك منتجاتنا من الأواني، وفقًا لقوانين سلطنة عمان.`
              : ` (the "Website") and make purchases, including for our crockery
            products, in accordance with the laws of the Sultanate of Oman.`}
          </Typography>

          {/* 1. Information We Collect */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "1. المعلومات التي نجمعها" : "1. Information We Collect"}
          </Typography>
          <Typography paragraph>
            {rtl
              ? `نحن نجمع المعلومات الشخصية عندما تزور موقعنا الإلكتروني أو تقوم بعمليات شراء أو تتفاعل معنا بأي شكل من الأشكال. وتشمل أنواع المعلومات التي نجمعها ما يلي:`
              : `We collect personal information when you visit our website, make
            purchases, or interact with us in any way. The types of information
            we collect include:`}
          </Typography>
          <Box component="ul">
            <li>
              {rtl
                ? "معلومات التعريف الشخصية: الاسم، عنوان البريد الإلكتروني، رقم الهاتف، عنوان الفواتير والشحن."
                : "Personal Identification Information: Name, email address, phone number, billing and shipping address."}
            </li>
            <li>
              {rtl
                ? "معلومات الدفع: تفاصيل بطاقة الائتمان/الخصم، معلومات الحساب البنكي (تُستخدم فقط لمعالجة الدفع)."
                : "Payment Information: Credit/debit card details, bank account information (only used for payment processing)."}
            </li>
            <li>
              {rtl
                ? "بيانات الاستخدام: عنوان IP، نوع المتصفح، نظام التشغيل، وسلوك التصفح على الموقع (باستخدام ملفات تعريف الارتباط وتقنيات التتبع الأخرى)."
                : "Usage Data: IP address, browser type, operating system, and browsing behavior on the website (using cookies and other tracking technologies)."}
            </li>
          </Box>

          {/* 2. How We Use Your Information */}
          <Typography variant="h5" gutterBottom>
            {rtl
              ? "2. كيفية استخدام معلوماتك"
              : "2. How We Use Your Information"}
          </Typography>
          <Box component="ul">
            <li>
              {rtl
                ? "لمعالجة طلباتك وتوصيل منتجات الأواني إلى عنوانك."
                : "To process your orders and deliver crockery goods to your address."}
            </li>
            <li>
              {rtl
                ? "للرد على استفساراتك وتقديم الدعم للعملاء."
                : "To respond to your queries and provide customer support."}
            </li>
            <li>
              {rtl
                ? "لتحسين وظائف الموقع وتجربة المستخدم."
                : "To improve the functionality and user experience of the Website."}
            </li>
            <li>
              {rtl
                ? "للتواصل معك بشأن العروض الترويجية والمنتجات الجديدة والتحديثات، إذا كنت قد اشتركت في المواد التسويقية لدينا."
                : "To communicate with you about promotions, new products, and updates, if you have subscribed to our marketing materials."}
            </li>
          </Box>

          {/* 3. Data Security */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "3. أمان البيانات" : "3. Data Security"}
          </Typography>
          <Typography paragraph>
            {rtl
              ? `نحن نتخذ التدابير التقنية والتنظيمية المناسبة لحماية بياناتك الشخصية من الوصول أو التعديل أو الإتلاف غير المصرح به. تتم معالجة جميع معاملات الدفع بأمان من خلال بوابات الدفع الخاصة بأطراف خارجية.`
              : `We take appropriate technical and organizational measures to protect
            your personal data from unauthorized access, alteration, or
            destruction. All payment transactions are processed securely through
            our third-party payment gateways.`}
          </Typography>

          {/* 4. Sharing Your Information */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "4. مشاركة معلوماتك" : "4. Sharing Your Information"}
          </Typography>
          <Box component="ul">
            <li>
              {rtl
                ? "مزوّدو الخدمة: قد نشارك معلوماتك مع البائعين الخارجيين الموثوق بهم الذين يساعدوننا في إدارة أعمالنا (مثل معالجي الدفع وشركات الشحن)."
                : "Service Providers: We may share your information with trusted third-party vendors who assist us in running our business (such as payment processors, shipping companies)."}
            </li>
            <li>
              {rtl
                ? "الامتثال القانوني: إذا تطلب القانون ذلك، فقد نُفصح عن معلوماتك الشخصية للامتثال للالتزامات القانونية، مثل طلبات إنفاذ القانون أو الاستجابة للإجراءات القانونية."
                : "Legal Compliance: If required by law, we may disclose your personal information to comply with legal obligations, such as law enforcement requests or in response to legal proceedings."}
            </li>
            <li>
              {rtl
                ? "تحويلات الأعمال: في حال حدوث اندماج أو استحواذ أو بيع لأعمالنا، فقد يتم نقل معلوماتك الشخصية كجزء من هذه الصفقة."
                : "Business Transfers: In the event of a merger, acquisition, or sale of our business, your personal information may be transferred as part of the transaction."}
            </li>
          </Box>

          {/* 5. Cookies */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "5. ملفات تعريف الارتباط (الكوكيز)" : "5. Cookies"}
          </Typography>
          <Typography paragraph>
            {rtl
              ? `يستخدم موقعنا الإلكتروني ملفات تعريف الارتباط لتحسين تجربة التصفح لديك. ملفات تعريف الارتباط هي ملفات صغيرة يتم تخزينها على جهازك وتساعدنا في تذكر تفضيلاتك وتحسين تجربتك العامة على موقعنا الإلكتروني. يمكنك تعطيل ملفات تعريف الارتباط من خلال إعدادات المتصفح، ولكن قد يؤثر ذلك على بعض ميزات الموقع.`
              : `Our website uses cookies to enhance your browsing experience. Cookies
            are small files stored on your device that help us remember your
            preferences and improve your overall experience on our Website. You
            may disable cookies through your browser settings, but this may affect
            some features of the Website.`}
          </Typography>

          {/* 6. Your Rights */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "6. حقوقك" : "6. Your Rights"}
          </Typography>
          <Typography paragraph>
            {rtl
              ? `بموجب قوانين سلطنة عمان، يحق لك:`
              : `Under the laws of Oman, you have the right to:`}
          </Typography>
          <Box component="ul">
            <li>
              {rtl
                ? "الوصول: طلب نسخة من البيانات الشخصية التي نحتفظ بها عنك."
                : "Access: Request a copy of the personal data we hold about you."}
            </li>
            <li>
              {rtl
                ? "التصحيح: طلب تصحيح أي بيانات غير دقيقة أو غير مكتملة."
                : "Rectification: Request that any inaccurate or incomplete data be corrected."}
            </li>
            <li>
              {rtl
                ? "الحذف: طلب حذف بياناتك الشخصية، مع مراعاة الالتزامات القانونية."
                : "Deletion: Request that your personal data be deleted, subject to legal obligations."}
            </li>
            <li>
              {rtl
                ? "سحب الموافقة: سحب أي موافقة تم منحها لاستخدام بياناتك الشخصية، إذا كان ذلك قابلاً للتطبيق."
                : "Withdraw Consent: Withdraw any consent given for the use of your personal data, where applicable."}
            </li>
          </Box>
          <Typography paragraph>
            {rtl
              ? `لممارسة هذه الحقوق، يرجى التواصل معنا على `
              : `To exercise these rights, please contact us at `}
            <strong>{process.env.REACT_APP_EMAIL_ADDRESS}</strong>.
          </Typography>

          {/* 7. Third-Party Websites */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "7. مواقع الأطراف الخارجية" : "7. Third-Party Websites"}
          </Typography>
          <Typography paragraph>
            {rtl
              ? `قد يحتوي موقعنا الإلكتروني على روابط لمواقع إلكترونية تابعة لأطراف خارجية. نحن لسنا مسؤولين عن ممارسات الخصوصية أو محتوى هذه المواقع. نشجعك على مراجعة سياسات الخصوصية الخاصة بهم قبل مشاركة أي بيانات شخصية معهم.`
              : `Our Website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of these websites. We
            encourage you to review their privacy policies before sharing any
            personal data with them.`}
          </Typography>

          {/* 8. Changes to This Privacy Policy */}
          <Typography variant="h5" gutterBottom>
            {rtl
              ? "8. التغييرات على سياسة الخصوصية هذه"
              : "8. Changes to This Privacy Policy"}
          </Typography>
          <Typography paragraph>
            {rtl
              ? `قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة مع تاريخ سريان محدث. نشجعك على مراجعة هذه السياسة بشكل دوري.`
              : `We may update our Privacy Policy from time to time. Any changes will
            be posted on this page with an updated effective date. We encourage
            you to review this policy periodically.`}
          </Typography>

          {/* 9. Contact Us */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "9. اتصل بنا" : "9. Contact Us"}
          </Typography>
          <Typography paragraph>
            {rtl
              ? `إذا كانت لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه أو كيفية معالجة بياناتك الشخصية، يرجى الاتصال بنا على:`
              : `If you have any questions or concerns about this privacy policy or how
            your personal data is handled, please contact us at:`}
          </Typography>
          <Typography paragraph>
            <strong>HM Awani</strong>
            <br /> Oman, Salalah
            <br /> {process.env.REACT_APP_WHATSAPP_NUMBER}
            <br /> {process.env.REACT_APP_EMAIL_ADDRESS}
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
