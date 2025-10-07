export default function Tag({ text, color }) {
    return (
      <span
        className={`text-white px-2 py-2 rounded-full mr-2`}
        style={{ backgroundColor: color }}
      >
        {text}
      </span>
    );
  }
  