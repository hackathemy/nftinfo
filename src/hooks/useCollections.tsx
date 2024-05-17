import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

export const useCollections = () => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const { items } = await pb.collection("collections").getList(1, 100);
      return items;
    },
  });
};
