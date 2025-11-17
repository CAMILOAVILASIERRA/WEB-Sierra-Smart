import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type AppointmentFormProps = { embedded?: boolean };

export default function AppointmentForm({ embedded = false }: AppointmentFormProps) {
  return (
    <div id="appointment-form" className={embedded ? "" : "py-16 px-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5"}>
      <div className={embedded ? "" : "max-w-3xl mx-auto"}>
        <Card className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-sm shadow-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-extralight">Déjanos tus datos</CardTitle>
            <CardDescription className="font-light">
              Completa el formulario y nos pondremos en contacto contigo para una asesoría.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden">
            <iframe 
              src="https://airtable.com/embed/apptKzzcU41fclftl/pagLwjHaA8CFdiG4f/form"
              className="w-full h-[560px] md:h-[700px] border-0 rounded-b-3xl"
              title="Formulario de Contacto"
              loading="lazy"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
