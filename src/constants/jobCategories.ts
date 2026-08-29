export type JobPostCategory = "WEB" | "IMAGE" | "SNS";

export const JOB_CATEGORY_OPTIONS: { value: JobPostCategory; label: string }[] = [
  { value: "SNS", label: "SNS 운영" },
  { value: "IMAGE", label: "이미지 제작" },
  { value: "WEB", label: "웹사이트 개발" },
];

export function jobCategoryLabel(value: string): string {
  return (
    JOB_CATEGORY_OPTIONS.find((option) => option.value === value)?.label ??
    value
  );
}
