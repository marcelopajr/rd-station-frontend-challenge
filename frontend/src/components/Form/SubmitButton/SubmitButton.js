import React from 'react';

function SubmitButton({ text, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold mt-4 transition ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
      }`}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
