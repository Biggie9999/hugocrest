-- ============================================
-- PRIVATBANK ZURICH - CLEANUP SCRIPT
-- Deletes the fake external accounts and their linked transactions
-- ============================================

-- 1. First, delete any transactions that were sent to these fake accounts
-- (This resolves the foreign key constraint error)
DELETE FROM public.transactions 
WHERE to_account_id IN (
  SELECT id FROM public.accounts 
  WHERE name IN ('TEST - TEST TEST', 'YY', 'HSBC - AME FRED')
);

-- 2. Now it is safe to delete the fake accounts themselves
DELETE FROM public.accounts 
WHERE name IN ('TEST - TEST TEST', 'YY', 'HSBC - AME FRED');

-- Done!
