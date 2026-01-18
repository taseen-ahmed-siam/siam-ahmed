import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface HeroSettings {
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageUrl?: string;
}

export interface AboutSettings {
  title: string;
  description: string;
  skills: string[];
  imageUrl?: string;
}

export interface ContactSettings {
  email: string;
  phone: string;
  location: string;
}

export interface SocialSettings {
  twitter: string;
  linkedin: string;
  github: string;
  instagram: string;
}

export interface ThemeSettings {
  primaryColor: string;
  accentColor: string;
}

type SettingsKey = 'hero' | 'about' | 'contact' | 'social' | 'theme';

export const useSiteSettings = <T>(key: SettingsKey) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['site-settings', key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();
      
      if (error) throw error;
      return data?.value as T;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes - settings change rarely
    gcTime: 1000 * 60 * 60, // 1 hour cache
  });

  const mutation = useMutation({
    mutationFn: async (value: T) => {
      const { error } = await supabase
        .from('site_settings')
        .update({ value: value as never })
        .eq('key', key);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings', key] });
      toast.success('Settings saved successfully!');
    },
    onError: (error) => {
      toast.error('Failed to save settings: ' + error.message);
    }
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    update: mutation.mutate,
    isUpdating: mutation.isPending
  };
};

export const useAllSiteSettings = () => {
  return useQuery({
    queryKey: ['site-settings', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      
      const settings: Record<string, unknown> = {};
      data?.forEach(item => {
        settings[item.key] = item.value;
      });
      
      return settings as {
        hero: HeroSettings;
        about: AboutSettings;
        contact: ContactSettings;
        social: SocialSettings;
        theme: ThemeSettings;
      };
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60, // 1 hour cache
  });
};
