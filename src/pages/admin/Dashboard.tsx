import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, Settings, Palette, ArrowRight, Eye } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { data: posts } = useBlogPosts(true);

  const publishedCount = posts?.filter((p) => p.published).length ?? 0;
  const draftCount = posts?.filter((p) => !p.published).length ?? 0;

  const quickActions = [
    {
      title: "Manage Blog Posts",
      description: "Create, edit, or delete blog posts",
      icon: FileText,
      href: "/admin/blog",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Edit Content",
      description: "Update text, images, and social links",
      icon: Settings,
      href: "/admin/content",
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Customize Theme",
      description: "Change colors and styling",
      icon: Palette,
      href: "/admin/theme",
      color: "bg-purple-500/10 text-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold">
            Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Welcome to your admin panel
          </p>
        </div>

        <Button asChild>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Eye className="mr-2 h-4 w-4" />
            View Live Site
          </a>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "Total Posts",
            value: posts?.length ?? 0,
          },
          {
            label: "Published",
            value: publishedCount,
            className: "text-green-500",
          },
          {
            label: "Drafts",
            value: draftCount,
            className: "text-yellow-500",
          },
          {
            label: "Status",
            value: "Active",
            isText: true,
            className: "text-primary",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={`font-bold ${
                    stat.isText ? "text-lg" : "text-3xl"
                  } ${stat.className ?? ""}`}
                >
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-xl font-display font-semibold">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <Link to={action.href} className="block h-full">
                <Card className="group h-full cursor-pointer transition-colors hover:border-primary">
                  <CardContent className="flex h-full flex-col p-6">
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${action.color}`}
                    >
                      <action.icon className="h-6 w-6" />
                    </div>

                    <h3 className="mb-1 font-semibold transition-colors group-hover:text-primary">
                      {action.title}
                    </h3>

                    <p className="mb-4 text-sm text-muted-foreground">
                      {action.description}
                    </p>

                    <div className="mt-auto flex items-center text-sm font-medium text-primary">
                      Go to {action.title.split(" ")[1]}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      {posts?.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-display font-semibold">
              Recent Posts
            </h2>
            <Link
              to="/admin/blog"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {posts.slice(0, 5).map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="flex items-center justify-between gap-4 p-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`whitespace-nowrap rounded px-2 py-1 text-xs font-medium ${
                        post.published
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
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
