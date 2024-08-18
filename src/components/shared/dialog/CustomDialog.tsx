import { ReactNode, useState } from 'react';
import { Dialog } from '@radix-ui/themes';

const CustomDialog = ({
  content,
  trigger,
  maxWidth = 600,
}: {
  content: (dismiss: () => void) => ReactNode;
  trigger: ReactNode;
  maxWidth?: number;
}) => {
  const [open, setOpen] = useState(false);
  const dismiss = () => setOpen(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content style={{ maxWidth }}>{content(dismiss)}</Dialog.Content>
    </Dialog.Root>
  );
};

export default CustomDialog;
