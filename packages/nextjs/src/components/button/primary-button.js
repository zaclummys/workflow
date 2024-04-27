export default function PrimaryButton (props) {
    return  <button className="button bg-primary text-on-primary hover:bg-[var(--primary-hover-layer)] active:bg-[var(--primary-press-layer)]" { ...props } />;
}
