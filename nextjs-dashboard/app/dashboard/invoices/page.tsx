import { Suspense } from 'react';
import Search from '@/app/ui/search';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import Table from '@/app/ui/invoices/table';
import Pagination from '@/app/ui/invoices/pagination';
import { fetchFilteredInvoices } from '@/app/lib/data';
import { fetchInvoicesPages } from '@/app/lib/data';


async function InvoicesContent({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Table query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} /> {/* Ajusta según tus datos */}
    </>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  return (
    <main>
      <h1 className="text-2xl font-semibold">Invoices</h1>
      <Suspense fallback={<p className="mt-6">Cargando facturas...</p>}>
        <InvoicesContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
