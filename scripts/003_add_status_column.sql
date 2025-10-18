-- Add status column to blog_posts table if it doesn't exist
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'draft';

-- Update existing posts to have status based on published flag
UPDATE blog_posts
SET status = CASE 
  WHEN published = true THEN 'post'
  ELSE 'draft'
END
WHERE status = 'draft';
