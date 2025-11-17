import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabaseUntyped as supabase } from '@/lib/supabase-untyped';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

interface AppointmentRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_interest: string | null;
  message: string | null;
  created_at: string;
}

export default function Admin() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<AppointmentRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchRequests();
    }
  }, [user, isAdmin]);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('appointment_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error fetching requests:', error);
      }
      toast.error('Error al cargar las solicitudes');
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('appointment_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setRequests(requests.filter(r => r.id !== id));
      toast.success('Solicitud eliminada');
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error deleting request:', error);
      }
      toast.error('Error al eliminar la solicitud');
    }
  };

  const getServiceLabel = (service: string | null) => {
    const labels: Record<string, string> = {
      real_estate: 'Bienes Raíces',
      hotel: 'Hotelería',
      ai_agent: 'Agente IA',
      systems: 'Sistemas',
      other: 'Otro'
    };
    return service ? labels[service] || service : '-';
  };

  if (loading || loadingRequests) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Acceso Denegado</CardTitle>
            <CardDescription>No tienes permisos de administrador</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={signOut} variant="outline">Cerrar Sesión</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <p className="text-muted-foreground">Solicitudes de agendamiento</p>
          </div>
          <Button onClick={signOut} variant="outline">Cerrar Sesión</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Solicitudes Recibidas</CardTitle>
            <CardDescription>Total: {requests.length} solicitudes</CardDescription>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No hay solicitudes aún</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Servicio</TableHead>
                      <TableHead>Mensaje</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.phone || '-'}</TableCell>
                        <TableCell>{request.company || '-'}</TableCell>
                        <TableCell>{getServiceLabel(request.service_interest)}</TableCell>
                        <TableCell className="max-w-xs truncate">{request.message || '-'}</TableCell>
                        <TableCell>{new Date(request.created_at).toLocaleDateString('es-ES')}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleDelete(request.id)}
                            variant="destructive"
                            size="sm"
                          >
                            Eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
