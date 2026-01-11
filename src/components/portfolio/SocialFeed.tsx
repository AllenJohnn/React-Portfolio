import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
}

export const SocialFeed = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  const GITHUB_USERNAME = "AllenJohnn";

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=9`
        );
        const data = await response.json();
        const formattedRepos = data.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || "No description",
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language || "N/A",
        }));
        setRepos(formattedRepos);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  return (
    <section id="social" className="py-20 md:py-28 px-4 md:px-[8%] relative overflow-hidden">
      {/* Gradient background */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 text-sm font-semibold mb-2 tracking-widest">OPEN SOURCE</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-wider mb-4">
            GitHub Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my latest repositories and contributions
          </p>
        </motion.div>

        {/* Repositories Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {loading ? (
            // Loading skeletons
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 animate-pulse"
              >
                <div className="h-6 bg-muted rounded w-3/4 mb-4" />
                <div className="h-4 bg-muted rounded w-full mb-3" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            ))
          ) : repos.length > 0 ? (
            repos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-card border border-border rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300 overflow-hidden card-hover-enhanced"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 flex-1">
                      <Github size={24} className="text-purple-400 flex-shrink-0" />
                      <h3 className="text-lg font-bold group-hover:text-purple-400 transition-colors line-clamp-1">
                        {repo.name}
                      </h3>
                    </div>
                    <ExternalLink
                      size={18}
                      className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:text-purple-400 flex-shrink-0 ml-2"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
                    {repo.description}
                  </p>

                  {/* Language badge */}
                  {repo.language && repo.language !== "N/A" && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full border border-purple-400/30">
                        {repo.language}
                      </span>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground hover:text-purple-400 transition-colors">
                      <Star size={16} className="text-purple-400" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground hover:text-purple-400 transition-colors">
                      <GitFork size={16} className="text-purple-400" />
                      <span>{repo.forks}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">No repositories found</p>
            </div>
          )}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <a
            href="https://github.com/AllenJohnn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:-translate-y-1"
          >
            <Github size={20} />
            View All on GitHub
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
