import { ConditionalRender } from "@/modules/common";

interface IProps {
  title?: string;
  count?: number;
}

export const TabsHeaderItem: React.FC<IProps> = ({ count, title }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="font-medium text-sm">{title}</div>
    <ConditionalRender if={count}>
      <div className="size-8 rounded-full bg-muted dark:bg-muted-dark flex items-center justify-center font-medium text-sm">
        {count}
      </div>
    </ConditionalRender>
  </div>
);
