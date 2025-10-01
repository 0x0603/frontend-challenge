import Button from "@/components/Button";
import Input from "@/components/Input";

interface InviteCodeProps {
  nextStep: () => void;
}

const InviteCodeForm = ({ nextStep }: InviteCodeProps) => {
  return (
    <>
      <Input
        placeholder="Enter your referral code"
        // value={referralCode}
        // onChange={(e) => setReferralCode(e.target.value)}
        autoFocus
      />
      <Button
        type="button"
        onClick={nextStep}
        // disabled={!referralCode.trim()}
        mt="auto"
        styleVariant="gradient"
      >
        Next
      </Button>
    </>
  );
};

export default InviteCodeForm;
