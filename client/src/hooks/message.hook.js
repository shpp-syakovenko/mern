import { useCallback } from 'react';

export const useMessage = () => {
  return useCallback(text => {
      // window.M идет с materialize-css
      if(window.M && text){
          window.M.toast({html: text})
      }
  },[])
};