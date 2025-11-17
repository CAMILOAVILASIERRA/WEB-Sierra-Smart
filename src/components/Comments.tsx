import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CommentItem = {
  id: string;
  authorId: string;
  authorName: string;
  text: string;
  createdAt: number; // epoch ms
};

const COMMENTS_KEY = "st_comments";
const USER_ID_KEY = "st_user_id";
const USER_NAME_KEY = "st_user_name";
const DELETE_WINDOW_MS = 60 * 60 * 1000; // 1 hora

const getOrCreateUserId = (): string => {
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `uid_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
};

const Comments = () => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [text, setText] = useState("");
  const [name, setName] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState(6);
  const userId = useMemo(() => getOrCreateUserId(), []);

  // Load persisted data
  useEffect(() => {
    const raw = localStorage.getItem(COMMENTS_KEY);
    const savedName = localStorage.getItem(USER_NAME_KEY) || "";
    setName(savedName);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as CommentItem[];
        // Sort newest first
        parsed.sort((a, b) => b.createdAt - a.createdAt);
        setComments(parsed);
      } catch (e) {
        console.warn("Failed to parse comments", e);
      }
    }
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  }, [comments]);

  const canDelete = (c: CommentItem) => c.authorId === userId && Date.now() - c.createdAt < DELETE_WINDOW_MS;

  const addComment = () => {
    const trimmed = text.trim();
    const displayName = name.trim() || "Anónimo";
    if (!trimmed) return;
    const newItem: CommentItem = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `c_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      authorId: userId,
      authorName: displayName,
      text: trimmed,
      createdAt: Date.now(),
    };
    setComments((prev) => [newItem, ...prev]);
    setText("");
    localStorage.setItem(USER_NAME_KEY, displayName);
  };

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const formattedDate = (ts: number) => new Date(ts).toLocaleString();

  const showMore = comments.length > visibleCount;
  const visibleComments = comments.slice(0, visibleCount);

  return (
    <section className="py-24 px-6 md:px-12 border-t border-border bg-secondary/20">
      <div className="container max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-8">Comentarios</h2>

        {/* Formulario */}
        <Card className="rounded-2xl border border-border bg-card/60 mb-8">
          <CardHeader>
            <CardTitle className="font-light text-lg">Comparte tu opinión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <input
                type="text"
                placeholder="Tu nombre (opcional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              />
              <textarea
                placeholder="Escribe tu comentario"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              />
              <div className="flex justify-end">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-light" onClick={addComment}>
                  Publicar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de comentarios */}
        <div className="grid gap-4">
          {visibleComments.map((c) => (
            <Card key={c.id} className="rounded-2xl border border-border bg-card/60">
              <CardContent className="py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{formattedDate(c.createdAt)}</p>
                    <p className="text-base font-light text-foreground">
                      <span className="text-accent/80 mr-2">{c.authorName}:</span>
                      {c.text}
                    </p>
                  </div>
                  {canDelete(c) && (
                    <Button
                      variant="outline"
                      className="font-light"
                      onClick={() => deleteComment(c.id)}
                      title="Eliminar tu comentario (disponible durante 1 hora)"
                    >
                      Eliminar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ver más */}
        {showMore && (
          <div className="flex justify-center mt-6">
            <Button variant="ghost" className="font-light" onClick={() => setVisibleCount((n) => n + 6)}>
              Ver más
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Comments;