-- Création de l'Enum pour les catégories de jours fériés
CREATE TYPE holiday_category AS ENUM ('Civil', 'National', 'Religieux', 'Mobile');

-- Création de la table 'holidays'
CREATE TABLE holidays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date_value DATE NOT NULL,
  category holiday_category NOT NULL,
  description TEXT,
  is_paid BOOLEAN DEFAULT true,
  is_bridge BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Activation de la sécurité RLS (Row Level Security)
ALTER TABLE holidays ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique
CREATE POLICY "lecture_publique_jours_feries" ON holidays
  FOR SELECT USING (is_published = true);

-- Politique d'écriture réservée aux administrateurs (exemple simple)
-- Note : À affiner plus tard avec Supabase Auth roles
CREATE POLICY "admin_all_access" ON holidays
  FOR ALL USING (auth.role() = 'service_role');

-- Insertion des données initiales (Sprint 1 snapshot)
INSERT INTO holidays (name, date_value, category, description)
VALUES 
  ('Jour de l''An', '2026-01-01', 'Civil', 'Premier jour de l''année civile.'),
  ('Lundi de Pâques', '2026-04-06', 'Religieux', 'Lundi suivant le dimanche de Pâques.'),
  ('Journée de la Femme', '2026-04-17', 'Civil', 'Célébration des droits des femmes au Gabon.'),
  ('Fête du Travail', '2026-05-01', 'Civil', 'Célébration internationale des travailleurs.'),
  ('Ascension', '2026-05-14', 'Religieux', 'Montée de Jésus au ciel.'),
  ('Lundi de Pentecôte', '2026-05-25', 'Religieux', 'Lundi suivant le dimanche de la Pentecôte.'),
  ('Fête Nationale (Veille)', '2026-08-16', 'National', 'Préparation de la fête de l''indépendance.'),
  ('Fête de l''Indépendance', '2026-08-17', 'National', 'Anniversaire de l''accession du Gabon à la souveraineté internationale (1960).'),
  ('Assomption', '2026-08-15', 'Religieux', 'Célébration de la montée au ciel de la Vierge Marie.'),
  ('Toussaint', '2026-11-01', 'Religieux', 'Fête de tous les saints.'),
  ('Noël', '2026-12-25', 'Religieux', 'Naissance de Jésus-Christ.');
