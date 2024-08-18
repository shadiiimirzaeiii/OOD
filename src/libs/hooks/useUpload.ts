import { useMutation } from '@tanstack/react-query';
import { Path, uploadImage } from '@/apis/shared/upload';
import { ToastError } from '../primitives';

type UploadProps = {
  path: Path;
  image: File;
};

const useUpload = () => {
  const mutation = useMutation({
    mutationFn: async ({ path, image }: UploadProps) => {
      return await uploadImage(path, image);
    },
    onError: () => ToastError('خطایی رخ داده است'),
  });

  return mutation;
};

export default useUpload;
