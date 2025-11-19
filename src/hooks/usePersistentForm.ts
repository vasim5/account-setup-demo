import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Args = {
  watch: any;
  reset: (values: any) => void;
};

export default function usePersistentForm(key: string, { watch, reset }: Args) {
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(key);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          reset(parsed);
        } catch (e) {
          // ignore
        }
      }
    })();
    const subscription = watch((value: any) => {
      AsyncStorage.setItem(key, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [key, reset, watch]);
}
