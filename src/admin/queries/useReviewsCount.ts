
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { adminKeys } from "@/admin/types/queries"

export const useReviewsCount = () => {
  return useQuery({
    queryKey: [...adminKeys.reviews(), 'count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('part_reviews') // Changed from 'printer_parts_reviews' to 'part_reviews'
        .select('*', { count: 'exact' })

      if (error) throw error
      return count || 0
    }
  })
}
