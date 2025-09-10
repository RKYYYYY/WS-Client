import { useForm } from "react-hook-form"; // hook pour gérer les formulaires facilement
import * as yup from "yup"; // bibliothèque de validation de schéma
import { yupResolver } from "@hookform/resolvers/yup"; // intégration de yup avec react-hook-form
import toast from "react-hot-toast"; // bibliothèque pour afficher des notifications
import { useNavigate } from "react-router-dom"; // hook pour la navigation programmatique
import { useAuth } from "../../context/AuthContext"; // hook personnalisé pour gérer l'authentification
import { signIn } from "../../api/auth.api";

// Import des composants réutilisables
import Button from "../../components/Common/Button"; // composant bouton personnalisé

export default function Login() {
  const navigate = useNavigate(); // initialise la navigation programmatique
  const { login } = useAuth(); // récupère la fonction login du contexte d'authentification

  // Structure initiale des données du formulaire
  const defaultValues = {
    data: "", // champ pour username/email
    password: "", // champ pour mot de passe
  };

  // Définition des règles de validation avec Yup
  const schema = yup.object({
    data: yup.string().required("Username or e-mail is required"), // validation du champ data
    password: yup.string().required("Password is required"), // validation du mot de passe
  });

  // Configuration et destructuration des fonctionnalités de react-hook-form
  const {
    register, // fonction pour enregistrer les champs dans le formulaire
    handleSubmit, // wrapper pour gérer la soumission
    formState: { errors }, // état des erreurs du formulaire
    reset, // fonction pour réinitialiser le formulaire
  } = useForm({
    defaultValues, // valeurs par défaut
    resolver: yupResolver(schema), // intégration du schéma de validation
    mode: "onChange", // validation à chaque modification
  });

  // Gestion de la soumission du formulaire
  async function submit(values) {
    try {
      // Envoi des données de connexion au backend
      const userConnected = await signIn(values);

      if (userConnected.user) {
        toast.success("Connected"); // notification de succès
        login(userConnected.user); // mise à jour du contexte avec les infos user
        navigate("/"); // redirection vers la page d'accueil
        reset(defaultValues); // réinitialisation du formulaire
      } else {
        toast.error(userConnected.message); // affichage des erreurs du backend
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full flex-col max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 sm:p-6 font-schibsted-grotesk text-secondary-100 flex items-center">
      <h1 className="text-primary-400 text-3xl sm:text-5xl font-extrabold mb-30 mt-10">
        Log to my account
      </h1>
      <form
        className="flex flex-col gap-2 mb-6 mx-auto w-full min-w-0 sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] border border-secondary-700 rounded-[16px] py-3 sm:py-7 px-3 sm:px-7"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex flex-col mb-2">
          <label htmlFor="data" className="mb-2 text-base lg:text-lg">
            Username or E-mail
          </label>
          <input
            {...register("data")}
            type="text"
            id="data"
            placeholder="Enter your username or e-mail"
            className="border border-secondary-800 rounded-[12px] px-3 py-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.data && (
            <p className="text-red-400 text-base lg:text-lg mt-1">
              {errors.data.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="password" className="mb-2 text-base lg:text-lg">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="border border-secondary-800 rounded-[12px] px-3 py-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.password && (
            <p className="text-red-400 text-base lg:text-lg mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button colorVariant="btnPrimaryYellow" text="Login" type="submit" />
      </form>
      <div className="flex flex-col gap-3">
        <p className="text-base lg:text-lg">I want an account</p>
        <Button
          colorVariant="btnSecondaryYellow"
          text="Sign up"
          to="/register"
        />
      </div>
    </div>
  );
}
