import styles from "./styles.module.css";

type DefaultInputProps = {
  label: string;
  id: string;
} & React.ComponentProps<"input">;

export function DefaultInput({ label, id, type, ...rest }: DefaultInputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} className={styles.input} {...rest} />
    </>
  );
}
