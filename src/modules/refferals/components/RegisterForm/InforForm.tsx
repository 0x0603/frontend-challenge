import Button from "@/components/Button";
import Input from "@/components/Input";

const InforForm = () => {
  return (
    <>
      <Input
        placeholder="Enter your email"
        // value={email}
        // onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" styleVariant="gradient" flex={1}>
        Connect Wallet
      </Button>
    </>
  );
};

export default InforForm;
