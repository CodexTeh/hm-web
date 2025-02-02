import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { GetLanguage } from "@redux-state/selectors";

const ReturnPolicy = () => {
  const language = GetLanguage();
  const rtl = language === "ar";
  const currentDate = new Date().toLocaleDateString();

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 4,
        direction: rtl ? "rtl" : "ltr",
        textAlign: rtl ? "right" : "left",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Title */}
        <Typography variant="h4" gutterBottom>
          {rtl ? "سياسة الإرجاع" : "Return Policy"}
        </Typography>

        {/* Effective Date */}
        <Typography variant="subtitle1" gutterBottom>
          {rtl
            ? `تاريخ السريان: ${currentDate}`
            : `Effective Date: ${currentDate}`}
        </Typography>

        {/* Intro Paragraph */}
        <Typography paragraph>
          {rtl ? (
            <>
              في HM Awani، نسعى جاهدين لضمان رضاك عن مشترياتك. إذا لم تكن راضيًا تمامًا عن منتجات
              الأواني التي قمت بشرائها لأي سبب من الأسباب، فإننا نقدم سياسة إرجاع بسيطة لتوفير أفضل
              خدمة عملاء ممكنة. يُرجى قراءة الشروط التالية بعناية.
            </>
          ) : (
            <>
              At Hm Awani, we strive to ensure that you are satisfied with your purchase. If for any
              reason you are not completely satisfied with the crockery goods you have purchased, we
              offer a straightforward return policy to provide you with the best customer service.
              Please read the following terms carefully.
            </>
          )}
        </Typography>

        {/* 1. General Return Policy */}
        <Typography variant="h5" gutterBottom>
          {rtl ? "1. سياسة الإرجاع العامة" : "1. General Return Policy"}
        </Typography>

        <Box component="ul">
          <li>
            {rtl ? (
              <>
                <strong>مدة الإرجاع:</strong> يمكنك إعادة المنتجات خلال [أدخل عدد الأيام] يومًا من
                تاريخ التسليم. إذا تم تقديم طلب الإرجاع بعد الفترة المحددة، للأسف لن نتمكن من قبول
                الإرجاع.
              </>
            ) : (
              <>
                <strong>Return Timeframe:</strong> You may return products within [insert number]
                days from the date of delivery. If the return request is made after the specified
                period, unfortunately, we will not be able to accept the return.
              </>
            )}
          </li>
          <li>
            {rtl ? (
              <>
                <strong>حالة المنتجات:</strong> لتكون مؤهلاً للإرجاع، يجب أن تكون المنتجات غير
                مستخدمة وغير مغسولة وفي حالتها الأصلية، بما في ذلك التغليف والملصقات والبطاقات.
                إذا تم استخدام المنتج أو تعرض للتلف، فلن يكون مؤهلاً للإرجاع.
              </>
            ) : (
              <>
                <strong>Condition of Items:</strong> To be eligible for a return, items must be
                unused, unwashed, and in their original condition, including packaging, labels, and
                tags. If the item has been used or damaged, it will not be eligible for a return.
              </>
            )}
          </li>
        </Box>

        {/* 2. Damaged or Defective Items */}
        <Typography variant="h5" gutterBottom>
          {rtl ? "2. المنتجات التالفة أو المعيبة" : "2. Damaged or Defective Items"}
        </Typography>
        <Box component="ul">
          <li>
            {rtl ? (
              <>
                إذا استلمت منتجًا تالفًا أو معيبًا، يُرجى الاتصال بنا خلال [أدخل عدد الأيام] يومًا
                من استلام طلبك. سنقدم لك استردادًا كاملاً أو استبدالًا وفقًا لتفضيلك.
              </>
            ) : (
              <>
                If you receive a damaged or defective product, please contact us within [insert
                number] days of receiving your order. We will offer you a full refund or replacement
                as per your preference.
              </>
            )}
          </li>
          <li>
            {rtl ? (
              <>
                لمعالجة الإرجاع، ستحتاج إلى تقديم صورة أو فيديو للمنتج التالف لمساعدتنا في حل
                المشكلة بكفاءة.
              </>
            ) : (
              <>
                To process the return, you will need to provide a photo or video of the damaged
                product to help us resolve the issue efficiently.
              </>
            )}
          </li>
        </Box>

        {/* 3. Non-Returnable Items */}
        <Typography variant="h5" gutterBottom>
          {rtl ? "3. المنتجات غير القابلة للإرجاع" : "3. Non-Returnable Items"}
        </Typography>
        <Box component="ul">
          <li>
            {rtl ? (
              <>
                <strong>العروض/التخفيضات:</strong> المنتجات المشتراة خلال فترة عروض أو تخفيضات لا
                يمكن إرجاعها ما لم تكن معيبة أو تالفة.
              </>
            ) : (
              <>
                <strong>Sale/Discounted items:</strong> Products purchased during a sale or discount
                period are non-returnable unless defective or damaged.
              </>
            )}
          </li>
          <li>
            {rtl ? (
              <>
                <strong>المنتجات المخصصة:</strong> أي منتجات تم تخصيصها أو تعديلها بناءً على طلب
                العميل لا يمكن إرجاعها.
              </>
            ) : (
              <>
                <strong>Custom Products:</strong> Any products that have been personalized or
                customized as per the customer’s request cannot be returned.
              </>
            )}
          </li>
        </Box>

        {/* 4. Return Process */}
        <Typography variant="h5" gutterBottom>
          {rtl ? "4. عملية الإرجاع" : "4. Return Process"}
        </Typography>
        <Typography paragraph sx={{ mb: 1 }}>
          {rtl
            ? "لبدء عملية الإرجاع، يرجى اتباع الخطوات التالية:"
            : "To initiate a return, please follow these steps:"}
        </Typography>

        <Box component="ol">
          <li>
            {rtl ? (
              <>
                <strong>تواصل معنا:</strong> اتصل بفريق دعم العملاء لدينا على [أدخل عنوان البريد
                الإلكتروني] أو [أدخل رقم الهاتف] مع تفاصيل طلبك وسبب الإرجاع.
              </>
            ) : (
              <>
                <strong>Contact Us:</strong> Reach out to our customer support team at [Insert Email
                Address] or [Insert Phone Number] with your order details and reason for return.
              </>
            )}
          </li>
          <li>
            {rtl ? (
              <>
                <strong>الموافقة:</strong> سيقوم فريقنا بمراجعة طلب الإرجاع وإرسال التعليمات الخاصة
                بإعادة المنتج، بما في ذلك عنوان الإرجاع.
              </>
            ) : (
              <>
                <strong>Approval:</strong> Our team will review the return request and send you
                instructions for returning the product, including a return address.
              </>
            )}
          </li>
          <li>
            {rtl ? (
              <>
                <strong>شحن الإرجاع:</strong> ستكون مسؤولاً عن تغطية تكاليف شحن الإرجاع ما لم يكن
                سبب الإرجاع عيبًا في المنتج أو خطأ من جانبنا.
              </>
            ) : (
              <>
                <strong>Return Shipping:</strong> You will be responsible for covering the return
                shipping costs unless the return is due to a defective or incorrect product.
              </>
            )}
          </li>
          <li>
            {rtl ? (
              <>
                <strong>الفحص:</strong> عند استلام المنتج المرتجع، سنقوم بفحصه للتأكد من استيفائه
                لمعايير الأهلية للإرجاع.
              </>
            ) : (
              <>
                <strong>Inspection:</strong> Upon receiving the returned product, we will inspect
                the item to ensure it meets the return eligibility criteria.
              </>
            )}
          </li>
          <li>
            {rtl ? (
              <>
                <strong>الاسترداد/الاستبدال:</strong> إذا تمت الموافقة على عملية الإرجاع، سنقوم
                بمعالجة استرداد المبلغ إلى طريقة الدفع الأصلية خلال [أدخل عدد الأيام]. بدلاً من ذلك،
                يمكننا إرسال منتج بديل إذا طلبت ذلك.
              </>
            ) : (
              <>
                <strong>Refund/Replacement:</strong> If your return is approved, we will process
                your refund to the original payment method within [insert number] days.
                Alternatively, we can send you a replacement if requested.
              </>
            )}
          </li>
        </Box>

        {/* 5. Refunds */}
        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
          {rtl ? "5. الاسترداد" : "5. Refunds"}
        </Typography>
        <Box component="ul">
          <li>
            {rtl ? (
              <>
                سيتم معالجة المبالغ المستردة بمجرد فحص المنتج المرتجع والموافقة عليه.
              </>
            ) : (
              <>
                Refunds will be processed once the returned product has been inspected and approved.
              </>
            )}
          </li>
          <li>
            {rtl ? (
              <>
                سيتم إرجاع المبلغ إلى طريقة الدفع الأصلية (بطاقة ائتمان/خصم، تحويل بنكي، إلخ).
              </>
            ) : (
              <>
                Refunds will be made to the original payment method (credit/debit card, bank
                transfer, etc.).
              </>
            )}
          </li>
          <li>
            {rtl ? (
              <>
                رسوم الشحن غير قابلة للاسترداد ما لم يكن الإرجاع بسبب منتج معيب أو تم شحن منتج
                خاطئ.
              </>
            ) : (
              <>
                Shipping charges are non-refundable unless the return is due to a defective or
                incorrect product.
              </>
            )}
          </li>
        </Box>

        {/* 6. Exchanges */}
        <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
          {rtl ? "6. الاستبدال" : "6. Exchanges"}
        </Typography>
        <Typography paragraph>
          {rtl ? (
            <>
              إذا كنت ترغب في استبدال منتج بآخر ذي مقاس أو لون أو طراز مختلف، يرجى الاتصال بنا في
              أقرب وقت ممكن. تخضع عمليات الاستبدال لتوفر المنتج ويجب أن تتبع نفس إجراءات الإرجاع
              المذكورة أعلاه.
            </>
          ) : (
            <>
              If you wish to exchange a product for a different size, color, or style, please
              contact us as soon as possible. Exchanges are subject to product availability and must
              follow the same return procedures mentioned above.
            </>
          )}
        </Typography>

        {/* 7. Return Shipping Costs */}
        <Typography variant="h5" gutterBottom>
          {rtl ? "7. تكاليف شحن الإرجاع" : "7. Return Shipping Costs"}
        </Typography>
        <Box component="ul">
          <li>
            {rtl ? (
              <>
                <strong>شحن الإرجاع للمنتجات التالفة:</strong> إذا كان الإرجاع بسبب عيب في المنتج أو
                خطأ من جانبنا (على سبيل المثال، تسليم منتج خاطئ)، فسنتحمل تكلفة شحن الإرجاع.
              </>
            ) : (
              <>
                <strong>Return Shipping for Defective Items:</strong> If the return is due to a
                defect or our error (e.g., wrong product delivered), we will cover the return
                shipping cost.
              </>
            )}
          </li>
          <li>
            {rtl ? (
              <>
                <strong>شحن الإرجاع لأسباب أخرى:</strong> إذا كان الإرجاع بسبب تغيير رأيك أو لأسباب
                شخصية أخرى، فسيتحمل العميل تكاليف شحن الإرجاع.
              </>
            ) : (
              <>
                <strong>Return Shipping for Other Reasons:</strong> If the return is due to a change
                of mind or other personal reasons, the customer will bear the return shipping
                charges.
              </>
            )}
          </li>
        </Box>

        {/* 8. Cancellation Policy */}
        <Typography variant="h5" gutterBottom>
          {rtl ? "8. سياسة الإلغاء" : "8. Cancellation Policy"}
        </Typography>
        <Box component="ul">
          <li>
            {rtl ? (
              <>
                إذا كنت ترغب في إلغاء طلبك قبل شحنه، يُرجى الاتصال بنا فورًا على [أدخل عنوان البريد
                الإلكتروني] أو [أدخل رقم الهاتف]. لا يمكن إلغاء الطلبات التي تم شحنها بالفعل.
              </>
            ) : (
              <>
                If you wish to cancel your order before it has been shipped, please contact us
                immediately at [Insert Email Address] or [Insert Phone Number]. Orders that have
                already been shipped cannot be canceled.
              </>
            )}
          </li>
        </Box>

        {/* 9. Governing Law */}
        <Typography variant="h5" gutterBottom>
          {rtl ? "9. القانون الحاكم" : "9. Governing Law"}
        </Typography>
        <Typography paragraph>
          {rtl ? (
            <>
              تخضع سياسة الإرجاع هذه وتُفسر وفقًا لقوانين سلطنة عُمان. في حالة وجود أي نزاع يتعلق
              بسياسة الإرجاع أو المبالغ المستردة أو الاستبدال، فسيخضع الأمر للاختصاص القضائي
              للمحاكم العمانية.
            </>
          ) : (
            <>
              This Return Policy is governed by and construed in accordance with the laws of the
              Sultanate of Oman. In the event of any dispute regarding returns, refunds, or
              exchanges, the matter will be subject to the jurisdiction of the Omani courts.
            </>
          )}
        </Typography>

        {/* 10. Contact Us */}
        <Typography variant="h5" gutterBottom>
          {rtl ? "10. اتصل بنا" : "10. Contact Us"}
        </Typography>
        <Typography paragraph>
          {rtl ? (
            <>
              إذا كانت لديك أي أسئلة بخصوص سياسة الإرجاع الخاصة بنا أو تحتاج إلى مساعدة في عملية
              إرجاع أو استبدال، يرجى التواصل معنا على:
              <br />
              <strong>HM Awani</strong>
              <br />
              عُمان، صلالة
              <br />
              +968 9207 8018
              <br />
              hamuqaibal@gmail.com
            </>
          ) : (
            <>
              If you have any questions regarding our Return Policy or need assistance with a return
              or exchange, please contact us at:
              <br />
              <strong>HM Awani</strong>
              <br />
              Oman, Salalah
              <br />
              +968 9207 8018
              <br />
              hamuqaibal@gmail.com
            </>
          )}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ReturnPolicy;
