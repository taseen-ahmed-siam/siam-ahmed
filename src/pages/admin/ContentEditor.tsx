import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';
import { useSiteSettings, HeroSettings, AboutSettings, ContactSettings, SocialSettings } from '@/hooks/useSiteSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const ContentEditor = () => {
  const heroSettings = useSiteSettings<HeroSettings>('hero');
  const aboutSettings = useSiteSettings<AboutSettings>('about');
  const contactSettings = useSiteSettings<ContactSettings>('contact');
  const socialSettings = useSiteSettings<SocialSettings>('social');

  const [hero, setHero] = useState<HeroSettings | null>(null);
  const [about, setAbout] = useState<AboutSettings | null>(null);
  const [contact, setContact] = useState<ContactSettings | null>(null);
  const [social, setSocial] = useState<SocialSettings | null>(null);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (heroSettings.data) setHero(heroSettings.data);
  }, [heroSettings.data]);

  useEffect(() => {
    if (aboutSettings.data) setAbout(aboutSettings.data);
  }, [aboutSettings.data]);

  useEffect(() => {
    if (contactSettings.data) setContact(contactSettings.data);
  }, [contactSettings.data]);

  useEffect(() => {
    if (socialSettings.data) setSocial(socialSettings.data);
  }, [socialSettings.data]);

  const handleAddSkill = () => {
    if (newSkill.trim() && about) {
      setAbout({ ...about, skills: [...about.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    if (about) {
      setAbout({ ...about, skills: about.skills.filter((_, i) => i !== index) });
    }
  };

  const isLoading = heroSettings.isLoading || aboutSettings.isLoading || contactSettings.isLoading || socialSettings.isLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold">Content Editor</h1>
        <p className="text-muted-foreground mt-1">Edit your website text, images, and links</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Edit the main hero section of your homepage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {hero && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="heroTitle">Title</Label>
                      <Input
                        id="heroTitle"
                        value={hero.title}
                        onChange={(e) => setHero({ ...hero, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heroSubtitle">Subtitle</Label>
                      <Input
                        id="heroSubtitle"
                        value={hero.subtitle}
                        onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heroDescription">Description</Label>
                      <Textarea
                        id="heroDescription"
                        value={hero.description}
                        onChange={(e) => setHero({ ...hero, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ctaPrimary">Primary Button Text</Label>
                        <Input
                          id="ctaPrimary"
                          value={hero.ctaPrimary}
                          onChange={(e) => setHero({ ...hero, ctaPrimary: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ctaSecondary">Secondary Button Text</Label>
                        <Input
                          id="ctaSecondary"
                          value={hero.ctaSecondary}
                          onChange={(e) => setHero({ ...hero, ctaSecondary: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => heroSettings.update(hero)}
                      disabled={heroSettings.isUpdating}
                      className="bg-gradient-primary"
                    >
                      {heroSettings.isUpdating ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save Hero Settings
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="about">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
                <CardDescription>Edit your about section content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {about && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="aboutTitle">Title</Label>
                      <Input
                        id="aboutTitle"
                        value={about.title}
                        onChange={(e) => setAbout({ ...about, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aboutDescription">Description</Label>
                      <Textarea
                        id="aboutDescription"
                        value={about.description}
                        onChange={(e) => setAbout({ ...about, description: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {about.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1">
                            {skill}
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(index)}
                              className="ml-2 hover:text-destructive"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                        />
                        <Button type="button" variant="outline" onClick={handleAddSkill}>
                          Add
                        </Button>
                      </div>
                    </div>
                    <Button
                      onClick={() => aboutSettings.update(about)}
                      disabled={aboutSettings.isUpdating}
                      className="bg-gradient-primary"
                    >
                      {aboutSettings.isUpdating ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save About Settings
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="contact">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Edit your contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contact && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone</Label>
                      <Input
                        id="contactPhone"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactLocation">Location</Label>
                      <Input
                        id="contactLocation"
                        value={contact.location}
                        onChange={(e) => setContact({ ...contact, location: e.target.value })}
                      />
                    </div>
                    <Button
                      onClick={() => contactSettings.update(contact)}
                      disabled={contactSettings.isUpdating}
                      className="bg-gradient-primary"
                    >
                      {contactSettings.isUpdating ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save Contact Settings
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="social">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Edit your social media links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {social && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter / X</Label>
                      <Input
                        id="twitter"
                        value={social.twitter}
                        onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={social.linkedin}
                        onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={social.github}
                        onChange={(e) => setSocial({ ...social, github: e.target.value })}
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={social.instagram}
                        onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <Button
                      onClick={() => socialSettings.update(social)}
                      disabled={socialSettings.isUpdating}
                      className="bg-gradient-primary"
                    >
                      {socialSettings.isUpdating ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save Social Links
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentEditor;
