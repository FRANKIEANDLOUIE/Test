import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";

export default function App() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    serialNumber: "",
    customerName: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      ...form,
      status: "Anfrage eingegangen",
      id: Date.now(),
    };
    setRequests([newRequest, ...requests]);
    setForm({ serialNumber: "", customerName: "", email: "", description: "" });
  };

  const advanceStatus = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status:
                req.status === "Anfrage eingegangen"
                  ? "In Prüfung"
                  : req.status === "In Prüfung"
                  ? "Angebot erstellt"
                  : "Abgeschlossen",
            }
          : req
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 font-sans">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold">🎯 Neue Installationsanfrage</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <Label>Seriennummer (S/N)</Label>
              <Input name="serialNumber" required value={form.serialNumber} onChange={handleChange} />
            </div>
            <div>
              <Label>Kunde</Label>
              <Input name="customerName" required value={form.customerName} onChange={handleChange} />
            </div>
            <div>
              <Label>E-Mail</Label>
              <Input name="email" type="email" required value={form.email} onChange={handleChange} />
            </div>
            <div className="col-span-2">
              <Label>Anliegen</Label>
              <Textarea name="description" required rows={3} value={form.description} onChange={handleChange} />
            </div>
            <div className="col-span-2">
              <Button type="submit" className="w-full">Anfrage absenden</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">📋 Eingegangene Anfragen</h2>
        {requests.length === 0 && <p className="text-gray-500">Noch keine Anfragen eingegangen.</p>}
        {requests.map((req) => (
          <Card key={req.id}>
            <CardContent className="space-y-2">
              <p><strong>📦 Seriennummer:</strong> {req.serialNumber}</p>
              <p><strong>👤 Kunde:</strong> {req.customerName}</p>
              <p><strong>📧 E-Mail:</strong> {req.email}</p>
              <p><strong>📝 Beschreibung:</strong> {req.description}</p>
              <p><strong>🚦 Status:</strong> {req.status}</p>
              {req.status !== "Abgeschlossen" && (
                <Button variant="outline" onClick={() => advanceStatus(req.id)}>
                  Nächster Schritt
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}