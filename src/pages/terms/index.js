import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import Footer from '@components/Footer';
import { GetLanguage } from "@redux-state/selectors";

const TermsAndConditions = () => {
  const language = GetLanguage();
  const rtl = language === "ar";
  const currentDateTime = new Date();

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          mb: 4,
          // Add RTL compatibility
          direction: rtl ? "rtl" : "ltr",
          textAlign: rtl ? "right" : "left",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {/* Title */}
          <Typography variant="h4" gutterBottom>
            {rtl ? "الشروط والأحكام" : "Terms and Conditions"}
          </Typography>

          {/* Effective Date */}
          <Typography variant="subtitle1" gutterBottom>
            {rtl ? `تاريخ السريان: ${currentDateTime.toLocaleDateString()}` : `Effective Date: ${currentDateTime.toLocaleDateString()}`}
          </Typography>

          {/* Intro Paragraph */}
          <Typography paragraph>
            {rtl ? (
              <>
                مرحبًا بكم في Hm Awani. يُرجى قراءة الشروط والأحكام التالية
                (“الشروط”، “الأحكام”) بعناية قبل استخدام الموقع أو تقديم طلب أو الانخراط في أي
                معاملة. تحكم هذه الشروط والأحكام استخدامك للموقع وبيع منتجات الأواني عليه. باستخدامك
                للموقع أو الوصول إليه، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على هذه
                الشروط، فيُرجى عدم استخدام الموقع.
              </>
            ) : (
              <>
                Welcome to Hm Awani. Please read the following Terms and
                Conditions ("Terms", "Terms and Conditions") carefully before using the Website,
                placing an order, or engaging in any transaction. These Terms and Conditions govern
                your use of the Website and the sale of crockery goods on it. By accessing or using
                the Website, you agree to comply with these Terms. If you do not agree to these Terms,
                please do not use the Website.
              </>
            )}
          </Typography>

          {/* 1. General Information */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "1. المعلومات العامة" : "1. General Information"}
          </Typography>
          <Typography paragraph>
            {rtl ? (
              <>
                Hm Awani مسجلة في عمان وتعمل وفقًا لقوانين سلطنة عمان. أنت توافق على الشروط
                المنصوص عليها هنا عند إجراء عملية شراء أو استخدام الموقع.
              </>
            ) : (
              <>
                Hm Awani is registered in Oman and operates under the laws of the Sultanate
                of Oman. You are agreeing to the terms stated herein when you make a purchase or use
                the Website.
              </>
            )}
          </Typography>

          {/* 2. Products and Services */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "2. المنتجات والخدمات" : "2. Products and Services"}
          </Typography>
          <Typography paragraph>
            {rtl ? (
              <>
                نحن نقدم مجموعة متنوعة من منتجات الأواني على موقعنا، بما في ذلك على سبيل المثال لا
                الحصر الأطباق والأكواب والأوعية والأدوات المنزلية الأخرى. يتم تقديم أوصاف المنتجات
                وصورها وأسعارها بأفضل قدر ممكن، لكننا لا نضمن دقة معلومات المنتج.
              </>
            ) : (
              <>
                We offer a variety of crockery goods on our Website, including but not limited to
                plates, cups, bowls, and other kitchenware. Product descriptions, images, and prices
                are provided to the best of our ability. However, we do not guarantee the accuracy of
                the product information.
              </>
            )}
          </Typography>

          {/* 3. Order Process */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "3. عملية الطلب" : "3. Order Process"}
          </Typography>
          <Box component="ul">
            <li>
              {rtl ? (
                <>
                  عندما تقوم بتقديم طلب على الموقع، فإنك تقدم عرضًا لشراء البضائع. الطلبات تخضع
                  لموافقتنا.
                </>
              ) : (
                <>
                  When you place an order on the Website, you are making an offer to purchase the
                  goods. Orders are subject to acceptance by us.
                </>
              )}
            </li>
            <li>
              {rtl ? (
                <>
                  نحتفظ بالحق في رفض أو إلغاء الطلبات وفقًا لتقديرنا الخاص، لأسباب مثل توفر المنتج أو
                  مشكلات في معالجة الدفع.
                </>
              ) : (
                <>
                  We reserve the right to refuse or cancel orders at our discretion, for reasons such
                  as product availability or payment processing issues.
                </>
              )}
            </li>
            <li>
              {rtl ? (
                <>
                  عند تأكيد الطلب، ستتلقى إشعارًا برقم الطلب. إذا كان المنتج غير متوفر، فسنخطرُك على
                  الفور وسنقدم لك استردادًا كاملاً إذا كان ذلك ممكنًا.
                </>
              ) : (
                <>
                  Upon order confirmation, you will receive a notification with an order number. If
                  the product is unavailable, we will notify you promptly and provide a full refund if
                  applicable.
                </>
              )}
            </li>
          </Box>

          {/* 4. Prices and Payment */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "4. الأسعار والدفع" : "4. Prices and Payment"}
          </Typography>
          <Box component="ul">
            <li>
              {rtl ? (
                <>
                  جميع الأسعار معروضة بعملة [العملة] وتشمل الضرائب المطبقة ما لم يُذكر خلاف ذلك.
                </>
              ) : (
                <>
                  All prices are listed in [Currency] and are inclusive of applicable taxes unless
                  otherwise stated.
                </>
              )}
            </li>
            <li>
              {rtl ? (
                <>
                  نقبل الدفع عبر [أدخل طرق الدفع، مثل البطاقات الائتمانية/الخصم، التحويل البنكي].
                </>
              ) : (
                <>
                  We accept payment through payment methods, e.g., credit/debit cards, bank
                  transfer.
                </>
              )}
            </li>
            <li>
              {rtl ? (
                <>
                  يستخدم الموقع بوابة دفع آمنة من طرف ثالث لمعالجة الدفعات. نحن لا نخزن تفاصيل الدفع
                  الخاصة بك.
                </>
              ) : (
                <>
                  The Website uses a secure third-party payment gateway to process payments. We do not
                  store your payment details.
                </>
              )}
            </li>
          </Box>

          {/* 5. Shipping and Delivery */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "5. الشحن والتوصيل" : "5. Shipping and Delivery"}
          </Typography>
          <Box component="ul">
            <li>
              {rtl ? (
                <>
                  نقدم خدمات الشحن داخل عمان. سيتم احتساب رسوم الشحن عند إتمام عملية الشراء.
                </>
              ) : (
                <>
                  We offer shipping services within Oman. Shipping charges will be calculated at
                  checkout.
                </>
              )}
            </li>
            <li>
              {rtl ? (
                <>
                  تعتمد أوقات التسليم على توفر المنتجات وموقع الشحن. نسعى لتسليم الطلبات خلال [أدخل
                  الوقت المقدر]، لكننا لا نضمن مواعيد تسليم محددة.
                </>
              ) : (
                <>
                  Delivery times depend on the availability of the products and shipping location. We
                  strive to deliver orders within [insert estimated time], but we cannot guarantee
                  exact delivery dates.
                </>
              )}
            </li>
            <li>
              {rtl ? (
                <>
                  نحن غير مسؤولين عن التأخيرات الناجمة عن عوامل خارجية مثل الجمارك أو مشاكل شركات
                  الشحن.
                </>
              ) : (
                <>
                  We are not responsible for delays due to external factors such as customs or courier
                  service issues.
                </>
              )}
            </li>
          </Box>

          {/* 6. Returns and Refunds */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "6. الإرجاع والاسترداد" : "6. Returns and Refunds"}
          </Typography>
          <Box component="ul">
            <li>
              {rtl ? (
                <>
                  نقدم إمكانية إرجاع المنتجات خلال [أدخل العدد] أيام من استلامها، بشرط أن يكون المنتج
                  غير مستخدم وفي حالته الأصلية.
                </>
              ) : (
                <>
                  We offer returns on items within [insert number] days of receipt if the product is
                  unused and in its original condition.
                </>
              )}
            </li>
            <li>
              {rtl ? (
                <>
                  يمكن إرجاع أو استبدال المنتجات التالفة أو المعيبة خلال [أدخل العدد] أيام من استلامها.
                  يُرجى الاتصال بنا فورًا إذا استلمت منتجًا تالفًا.
                </>
              ) : (
                <>
                  Damaged or defective items can be returned or exchanged within [insert number] days
                  of receipt. Please contact us immediately if you receive a damaged product.
                </>
              )}
            </li>
            <li>
              {rtl ? (
                <>
                  سيتم معالجة المبالغ المُستردة وفقًا لطريقة الدفع الأصلية بمجرد استلام المنتج
                  المرتجع وفحصه.
                </>
              ) : (
                <>
                  Refunds will be processed to the original payment method once the returned item is
                  received and inspected.
                </>
              )}
            </li>
          </Box>

          {/* 7. Intellectual Property */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "7. الملكية الفكرية" : "7. Intellectual Property"}
          </Typography>
          <Box component="ul">
            <li>
              {rtl ? (
                <>
                  جميع المحتويات على الموقع، بما في ذلك النصوص والصور والشعارات وتصاميم المنتجات، هي
                  ملك لـ [اسم شركتك] أو الجهات المرخصة لها، وهي محمية بموجب قوانين حقوق النشر
                  والعلامات التجارية والملكية الفكرية الأخرى.
                </>
              ) : (
                <>
                  All content on the Website, including text, images, logos, and product designs, are
                  the property of [Your Company Name] or its licensors and are protected by copyright,
                  trademark, and other intellectual property laws.
                </>
              )}
            </li>
            <li>
              {rtl ? (
                <>
                  لا يجوز لك نسخ أي محتوى من الموقع أو تعديله أو توزيعه دون الحصول على إذن كتابي
                  مسبق.
                </>
              ) : (
                <>
                  You may not copy, modify, or distribute any content from the Website without prior
                  written permission.
                </>
              )}
            </li>
          </Box>

          {/* 8. Limitation of Liability */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "8. تحديد المسؤولية" : "8. Limitation of Liability"}
          </Typography>
          <Box component="ul">
            <li>
              {rtl ? (
                <>
                  بالقدر الذي يسمح به القانون، لا تتحمل [اسم شركتك] أية مسؤولية عن أية أضرار مباشرة
                  أو غير مباشرة أو عرضية أو تبعية تنشأ عن استخدام الموقع أو المنتجات المباعة.
                </>
              ) : (
                <>
                  To the fullest extent permitted by law, [Your Company Name] will not be liable for
                  any direct, indirect, incidental, or consequential damages arising from the use of
                  the Website or the products sold.
                </>
              )}
            </li>
            <li>
              {rtl ? (
                <>
                  لا نضمن أن الموقع خالٍ من الأخطاء أو آمن أو غير منقطع. إنك تستخدم الموقع على
                  مسؤوليتك الخاصة.
                </>
              ) : (
                <>
                  We do not guarantee that the Website will be error-free, secure, or uninterrupted.
                  You use the Website at your own risk.
                </>
              )}
            </li>
          </Box>

          {/* 9. Customer Obligations */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "9. التزامات العملاء" : "9. Customer Obligations"}
          </Typography>
          <Box component="ul">
            <li>
              {rtl ? (
                <>توافق على تقديم معلومات دقيقة وكاملة عند تقديم الطلب.</>
              ) : (
                <>You agree to provide accurate and complete information when placing an order.</>
              )}
            </li>
            <li>
              {rtl ? (
                <>أنت مسؤول عن الحفاظ على سرية معلومات حسابك وكلمة المرور الخاصة بك.</>
              ) : (
                <>
                  You are responsible for maintaining the confidentiality of your account and password
                  information.
                </>
              )}
            </li>
            <li>
              {rtl ? (
                <>
                  توافق على عدم استخدام الموقع لأي أنشطة غير قانونية أو محظورة، بما في ذلك الاحتيال
                  أو القرصنة أو نشر المحتوى الضار.
                </>
              ) : (
                <>
                  You agree not to use the Website for any unlawful or prohibited activities,
                  including fraud, hacking, or distributing malicious content.
                </>
              )}
            </li>
          </Box>

          {/* 10. Privacy and Data Protection */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "10. الخصوصية وحماية البيانات" : "10. Privacy and Data Protection"}
          </Typography>
          <Typography paragraph>
            {rtl ? (
              <>
                نحن نأخذ خصوصيتك على محمل الجد ونعالج بياناتك الشخصية وفقًا لسياسة الخصوصية الخاصة
                بنا. باستخدامك للموقع، فإنك توافق على سياسة الخصوصية الخاصة بنا التي تشرح كيفية جمع
                معلوماتك الشخصية واستخدامها وحمايتها.
              </>
            ) : (
              <>
                We take your privacy seriously and handle your personal data in accordance with our
                Privacy Policy. By using the Website, you agree to our Privacy Policy, which explains
                how we collect, use, and protect your personal information.
              </>
            )}
          </Typography>

          {/* 11. Governing Law */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "11. القانون الحاكم" : "11. Governing Law"}
          </Typography>
          <Typography paragraph>
            {rtl ? (
              <>
                تخضع هذه الشروط والأحكام وتُفسر وفقًا لقوانين سلطنة عمان. أي نزاعات تنشأ عن هذه
                الشروط ستخضع للاختصاص القضائي الحصري للمحاكم العمانية.
              </>
            ) : (
              <>
                These Terms and Conditions are governed by and constructed in accordance with the laws
                of the Sultanate of Oman. Any disputes arising from these Terms shall be subject to
                the exclusive jurisdiction of the Omani courts.
              </>
            )}
          </Typography>

          {/* 12. Amendments to Terms and Conditions */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "12. تعديلات على الشروط والأحكام" : "12. Amendments to Terms and Conditions"}
          </Typography>
          <Typography paragraph>
            {rtl ? (
              <>
                قد نقوم بتحديث هذه الشروط والأحكام من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة
                مع تاريخ سريان محدث. نحن نشجعك على مراجعة هذه الشروط بشكل دوري.
              </>
            ) : (
              <>
                We may update these Terms and Conditions from time to time. Any changes will be posted
                on this page with an updated effective date. We encourage you to review these Terms
                periodically.
              </>
            )}
          </Typography>

          {/* 13. Contact Us */}
          <Typography variant="h5" gutterBottom>
            {rtl ? "13. اتصل بنا" : "13. Contact Us"}
          </Typography>
          <Typography paragraph>
            {rtl ? (
              <>
                إذا كانت لديك أي أسئلة أو استفسارات بخصوص هذه الشروط والأحكام، يُرجى التواصل معنا
                على:
                <br />
                <strong>HM Awani</strong>
                <br /> Oman, Salalah
                <br /> {process.env.REACT_APP_WHATSAPP_NUMBER}
                <br />
                {process.env.REACT_APP_EMAIL_ADDRESS}
              </>
            ) : (
              <>
                If you have any questions or concerns regarding these Terms and Conditions, please
                contact us at:
                <br />
                <strong>HM Awani</strong>
                <br /> Oman, Salalah
                <br /> {process.env.REACT_APP_WHATSAPP_NUMBER}
                <br />
                {process.env.REACT_APP_EMAIL_ADDRESS}
              </>
            )}
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
