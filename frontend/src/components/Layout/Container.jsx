export default function Container({ as: Tag = "div", className = "", ...props }) {
  return (
    <Tag
      className={`mx-auto w-full max-w-site px-4 sm:px-6 lg:px-10 ${className}`}
      {...props}
    />
  );
}
