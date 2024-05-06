import { TbLoaderQuarter } from "react-icons/tb";
import PropType from "prop-types";

export default function Button({
  children,
  loading,
  className,
  disabled,
  progress,
  ...props
}) {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={
        "relative flex justify-center items-center rounded px-4 py-2 cursor-pointer text-sm font-semibold leading-6 text-white shadow-sm disabled:cursor-not-allowed disabled:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
        (progress ? "relative !bg-transparent " : "") +
        className
      }
      style={{ width: progress ? `${progress}%` : "" }}
    >
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center rounded">
          <TbLoaderQuarter className="animate-spin text-white" />
        </div>
      )}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropType.node.isRequired,
  loading: PropType.bool,
  disabled: PropType.bool,
  progress: PropType.number,
  className: PropType.string,
};
