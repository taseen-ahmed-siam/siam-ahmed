import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePrefetchSiteData = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Prefetch all site settings in one query
    const prefetchSettings = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('*');
      
      if (data) {
        // Cache each setting individually
        data.forEach(item => {
          queryClient.setQueryData(['site-settings', item.key], item.value);
        });
        
        // Also cache the 'all' query
        const settings: Record<string, unknown> = {};
        data.forEach(item => {
          settings[item.key] = item.value;
        });
        queryClient.setQueryData(['site-settings', 'all'], settings);
      }
    };

    prefetchSettings();
  }, [queryClient]);
};
