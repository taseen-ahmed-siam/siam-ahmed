import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Settings, Palette, ArrowRight, Eye } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { data: posts } = useBlogPosts(true);
  
  const publishedCount = posts?.filter(p => p.published).length ?? 0;
  const draftCount = posts?.filter(p => !p.published).length ?? 0;

  const quickActions = [
    {
      title: 'Manage Blog Posts',
      description: 'Create, edit, or delete blog posts',
      icon: FileText,
      href: '/admin/blog',
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      title: 'Edit Content',
      description: 'Update text, images, and social links',
      icon: Settings,
      href: '/admin/content',
      color: 'bg-green-500/10 text-green-500'
    },
    {
      title: 'Customize Theme',
      description: 'Change colors and styling',
      icon: Palette,
      href: '/admin/theme',
      color: 'bg-purple-500/10 text-purple-500'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your admin panel</p>
        </div>
        <Button asChild>
          <Link to="/" target="_blank">
            <Eye className="w-4 h-4 mr-2" />
            View Live Site
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{posts?.length ?? 0}</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Published
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">{publishedCount}</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Drafts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-500">{draftCount}</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-primary">Active</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-display font-semibold mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 5) }}
            >
              <Link to={action.href}>
                <Card className="hover:border-primary transition-colors cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {action.description}
                    </p>
                    <div className="flex items-center text-sm text-primary font-medium">
                      Go to {action.title.split(' ')[1]}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      {posts && posts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold">Recent Posts</h2>
            <Link to="/admin/blog" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {posts.slice(0, 5).map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      post.published 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
