import { LangProvider } from "@/contexts/lang-context";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { DammamSplitScreen } from "@/components/projects/DammamSplitScreen";

export const metadata = {
  title: "مدينة الدمام الأولمبية | AlShubaily",
  description: "جولة تفاعلية داخل مشروع مدينة الدمام الأولمبية",
};

export default function DammamPreviewPage() {
  return (
    <LangProvider>
      <SmoothScrollProvider>
        <DammamSplitScreen />
      </SmoothScrollProvider>
    </LangProvider>
  );
}
