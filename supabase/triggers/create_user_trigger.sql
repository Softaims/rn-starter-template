-- Enhanced trigger with debugging
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Debug: Log the new user data
  RAISE NOTICE 'Creating profile for user: % (%), username: %', 
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'username', 'NULL');
  
  INSERT INTO public.profiles (id, email, username, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'username', ''),
    NOW()
  );
  
  -- Debug: Log successful creation
  RAISE NOTICE 'Profile created successfully for user: %', NEW.id;
  
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Debug: Log any errors
    RAISE NOTICE 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();