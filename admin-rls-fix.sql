-- ============================================
-- PRIVATBANK ZURICH - ADMIN PANEL RLS FIX
-- Run this script to allow the Admin Panel to read all users and accounts
-- ============================================

-- Create policies to allow selecting all rows (bypassing RLS read restrictions for the admin panel)

-- Profiles
DROP POLICY IF EXISTS "Admin can view all profiles" ON public.profiles;
CREATE POLICY "Admin can view all profiles" ON public.profiles FOR SELECT USING (true);

-- Accounts
DROP POLICY IF EXISTS "Admin can view all accounts" ON public.accounts;
CREATE POLICY "Admin can view all accounts" ON public.accounts FOR SELECT USING (true);

-- Transactions
DROP POLICY IF EXISTS "Admin can view all transactions" ON public.transactions;
CREATE POLICY "Admin can view all transactions" ON public.transactions FOR SELECT USING (true);

-- Messages
DROP POLICY IF EXISTS "Admin can view all messages" ON public.messages;
CREATE POLICY "Admin can view all messages" ON public.messages FOR SELECT USING (true);

-- Allow Insert/Update from the admin panel (which uses the anon key when not logged in)
DROP POLICY IF EXISTS "Admin can insert accounts" ON public.accounts;
CREATE POLICY "Admin can insert accounts" ON public.accounts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can update accounts" ON public.accounts;
CREATE POLICY "Admin can update accounts" ON public.accounts FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Admin can insert transactions" ON public.transactions;
CREATE POLICY "Admin can insert transactions" ON public.transactions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can insert messages" ON public.messages;
CREATE POLICY "Admin can insert messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Done! Your Admin Panel will now be able to fetch and manipulate all data.
