import { createClient } from "@/lib/supabase-server";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Edit } from "lucide-react";
import Link from "next/link";

export default async function PackagesPage() {
  const supabase = await createClient();
  const { data: packages } = await supabase
    .from('coaching_packages')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif">Coaching Packages</h1>
          <p className="text-muted-foreground">Manage coaching offerings and pricing.</p>
        </div>
        <Button asChild>
          <Link href="/admin/packages/new">
            <Plus className="mr-2 h-4 w-4" /> New Package
          </Link>
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages && packages.length > 0 ? (
              packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>${pkg.total_price}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${pkg.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {pkg.is_published ? 'Published' : 'Draft'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/packages/${pkg.id}`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                     {/* Placeholder for delete action */}
                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No packages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
