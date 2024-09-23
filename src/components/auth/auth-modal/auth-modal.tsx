import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuthScreen } from "@/utils/enums/auth.enum";
import Login from "../login/login";
import Register from "../register/register";

interface IProps {
  screen: AuthScreen;
  isOpen: boolean;
  onClose: () => void;
  setAuthScreen: (value: AuthScreen) => void;
}

const AuthModal = ({ screen, isOpen, onClose, setAuthScreen }: IProps) => {
  const screenComponents = {
    login: <Login setAuthScreen={setAuthScreen} />,
    register: <Register setAuthScreen={setAuthScreen} />,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>{screenComponents[screen]}</DialogContent>
    </Dialog>
  );
};

export default AuthModal;
