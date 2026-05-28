import { useUserProfile } from '../context/UserProfileContext.jsx';
import { getBodyTypeData } from '../utils/bodyTypeUtils.js';

export const useBodyType = () => {
  const { bodyType, updateProfile } = useUserProfile();
  
  const currentMetadata = getBodyTypeData(bodyType);

  const changeBodyType = (newType) => {
    updateProfile({ type: newType });
  };

  return {
    bodyType,
    metadata: currentMetadata,
    changeBodyType
  };
};
