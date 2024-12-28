interface Props {
  handleLoginClick: () => void;
}

export const LoginHomeButton = ({ handleLoginClick }: Props) => {
  return (
    <button
      onClick={handleLoginClick}
      style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        fontSize: "1rem",
        backgroundColor: "#0070f3",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Login
    </button>
  );
};
