import pb from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

export const useCollection = (id: string) => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const record = await pb.collection("collections").getOne(id);
      return record;
    },
  });
};
