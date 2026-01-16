import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Palette } from 'lucide-react';
import { useSiteSettings, ThemeSettings } from '@/hooks/useSiteSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const presetColors = [
  { name: 'Coral', value: '16 90% 50%' },
  { name: 'Blue', value: '220 90% 50%' },
  { name: 'Green', value: '142 70% 45%' },
  { name: 'Purple', value: '270 70% 50%' },
  { name: 'Pink', value: '330 80% 55%' },
  { name: 'Amber', value: '38 92% 50%' },
  { name: 'Teal', value: '175 80% 40%' },
  { name: 'Rose', value: '350 90% 55%' },
];

const ThemeEditor = () => {
  const themeSettings = useSiteSettings<ThemeSettings>('theme');
  const [theme, setTheme] = useState<ThemeSettings | null>(null);

  useEffect(() => {
    if (themeSettings.data) setTheme(themeSettings.data);
  }, [themeSettings.data]);

  const handleSave = () => {
    if (theme) {
      themeSettings.update(theme);
    }
  };

  if (themeSettings.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold">Theme Editor</h1>
        <p className="text-muted-foreground mt-1">Customize your website colors and styling</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Primary Color
              </CardTitle>
              <CardDescription>Choose your brand's primary color</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => theme && setTheme({ ...theme, primaryColor: color.value })}
                    className={`aspect-square rounded-lg border-2 transition-all ${
                      theme?.primaryColor === color.value
                        ? 'border-foreground scale-95'
                        : 'border-transparent hover:scale-95'
                    }`}
                    style={{ backgroundColor: `hsl(${color.value})` }}
                    title={color.name}
                  />
                ))}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customPrimary">Custom Color (HSL)</Label>
                <Input
                  id="customPrimary"
                  value={theme?.primaryColor || ''}
                  onChange={(e) => theme && setTheme({ ...theme, primaryColor: e.target.value })}
                  placeholder="16 90% 50%"
                />
                <p className="text-xs text-muted-foreground">
                  Format: hue saturation% lightness% (e.g., "16 90% 50%")
                </p>
              </div>
              
              {theme?.primaryColor && (
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <div
                    className="w-12 h-12 rounded-lg"
                    style={{ backgroundColor: `hsl(${theme.primaryColor})` }}
                  />
                  <div>
                    <p className="font-medium">Current Color</p>
                    <p className="text-sm text-muted-foreground">{theme.primaryColor}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your changes look</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="p-6 rounded-xl text-white"
                style={{
                  background: theme?.primaryColor
                    ? `linear-gradient(135deg, hsl(${theme.primaryColor}) 0%, hsl(${adjustLightness(theme.primaryColor, 10)}) 100%)`
                    : 'linear-gradient(135deg, hsl(16 90% 50%) 0%, hsl(30 80% 50%) 100%)'
                }}
              >
                <h3 className="text-xl font-bold mb-2">Button Preview</h3>
                <p className="text-sm opacity-90">This is how your primary gradient will look</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: theme?.primaryColor ? `hsl(${theme.primaryColor})` : 'hsl(16 90% 50%)' }}
                >
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 rounded-lg font-medium border transition-colors"
                  style={{
                    borderColor: theme?.primaryColor ? `hsl(${theme.primaryColor})` : 'hsl(16 90% 50%)',
                    color: theme?.primaryColor ? `hsl(${theme.primaryColor})` : 'hsl(16 90% 50%)'
                  }}
                >
                  Outline Button
                </button>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <span
                    className="font-medium"
                    style={{ color: theme?.primaryColor ? `hsl(${theme.primaryColor})` : 'hsl(16 90% 50%)' }}
                  >
                    Accent text
                  </span>
                  {' '}will appear like this in your content.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">Save Changes</h3>
                <p className="text-sm text-muted-foreground">
                  Apply your theme changes to the live website
                </p>
              </div>
              <Button
                onClick={handleSave}
                disabled={themeSettings.isUpdating}
                className="bg-gradient-primary"
              >
                {themeSettings.isUpdating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Theme
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

// Helper function to adjust lightness in HSL
function adjustLightness(hsl: string, amount: number): string {
  const parts = hsl.split(' ');
  if (parts.length !== 3) return hsl;
  
  const lightness = parseInt(parts[2]);
  const newLightness = Math.max(0, Math.min(100, lightness + amount));
  
  return `${parts[0]} ${parts[1]} ${newLightness}%`;
}

export default ThemeEditor;
