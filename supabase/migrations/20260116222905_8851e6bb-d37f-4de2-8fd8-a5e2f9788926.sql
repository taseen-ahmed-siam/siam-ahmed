-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for secure role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create blog_posts table
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    category TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts
FOR SELECT
USING (published = true);

CREATE POLICY "Admins can manage all blog posts"
ON public.blog_posts
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create site_settings table for customization
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Site settings policies
CREATE POLICY "Anyone can view site settings"
ON public.site_settings
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage site settings"
ON public.site_settings
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Storage policies
CREATE POLICY "Anyone can view site images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'site-images');

CREATE POLICY "Admins can upload site images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
('hero', '{"title": "Hi, I''m Siam Ahmed", "subtitle": "Full Stack Developer & Designer", "description": "I build exceptional digital experiences that combine beautiful design with powerful functionality.", "ctaPrimary": "View My Work", "ctaSecondary": "Get In Touch"}'),
('about', '{"title": "About Me", "description": "I''m a passionate full-stack developer with expertise in building modern web applications. I love creating clean, efficient code and beautiful user interfaces.", "skills": ["React", "TypeScript", "Node.js", "Python", "UI/UX Design", "Database Design"]}'),
('contact', '{"email": "hello@siamahmed.com", "phone": "+1 (555) 123-4567", "location": "New York, NY"}'),
('social', '{"twitter": "https://twitter.com", "linkedin": "https://linkedin.com", "github": "https://github.com", "instagram": "https://instagram.com"}'),
('theme', '{"primaryColor": "24 100% 50%", "accentColor": "0 0% 98%"}');

-- Trigger for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();