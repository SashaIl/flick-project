import { MessageSquare, Clock } from "lucide-react";

interface Comment {
  id: string;
  text: string;
  postTitle: string;
  timestamp: string;
}

interface RecentCommentsProps {
  comments: Comment[];
}

const RecentComments = ({ comments }: RecentCommentsProps) => {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-primary backdrop-blur-xl overflow-hidden">

      {/* Header */}
      <div className="px-6 sm:px-8 py-5 border-b border-white/[0.06] flex items-center gap-3">
        <MessageSquare className="h-4 w-4 text-white/25" />
        <p className="text-[10px] tracking-[0.22em] uppercase text-white/25">
          Останні коментарі
        </p>
      </div>

      <div className="p-4 sm:p-6">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <MessageSquare className="h-8 w-8 text-white/10" />
            <p className="text-sm text-white/20 font-light tracking-wide">
              Коментарів ще немає
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {comments.map((comment, i) => (
              <div
                key={comment.id}
                className="group relative p-4 sm:p-5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-400 cursor-pointer"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Index number */}
                <span
                  className="absolute top-4 right-4 text-white/10 font-light select-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Post title */}
                <p className="text-[10px] tracking-[0.16em] uppercase text-white/30 group-hover:text-white/45 transition-colors duration-300 mb-2 pr-10 truncate">
                  {comment.postTitle}
                </p>

                {/* Comment text */}
                <p className="text-sm text-white/50 font-light leading-relaxed line-clamp-2 group-hover:text-white/65 transition-colors duration-300 mb-3">
                  {comment.text}
                </p>

                {/* Timestamp */}
                <div className="flex items-center gap-1.5 text-white/20">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs font-light">{comment.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentComments;