<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\Models\User;
use App\Models\Ticket;

use App\Models\Transaction;
use App\Models\Revenue;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\DBContext;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect(route('adminDashboard'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAdminRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAdminRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAdminRequest  $request
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function destroy(Admin $admin)
    {
        //
    }

    public function getUsers()
    {
        return DBContext::getUsers();
    }
    public function getTransactions()
    {
        try {
           $count=DB::table('transactions')
                        ->join(
                            'tickets',
                            'tickets.id',
                            '=',
                            'transactions.ticket_id'
                        )->join('routes','routes.id','=','tickets.route_id')->selectRaw('date, sum(price) as amount')
                        ->groupBy('transactions.date')
                        ->orderBy('transactions.date')
                        ->get();

            return response(["success"=>"Request successful", "transactions"=>Transaction::with('user')->with('ticket')->with('ticket.route')->orderBy('date')->get(), "error"=>"", "count"=>$count],200);
        } catch (\Throwable $th) {
            return $th;
            return response(["success"=>"","error"=>"Server under maintenance"], 500);
        }
    }

    public function deleteUser(Request $request)
    {
        try {
            $user = DBContext::getUser($request->id);
            $user->delete();
            return response(["success"=>"Delete successful", "error"=>""],200);
        } catch (\Throwable $th) {
            return response(["success"=>"","error"=>"Server under maintenance"], 500);
        }
    }

    public function getRevenues(Request $request)
    {
        try {
            $revenues = Revenue::orderBy('date')->get();
            return response(["success"=>"Request successful", "error"=>"", "revenues"=>$revenues],200);
        } catch (\Throwable $th) {
            return response(["success"=>"","error"=>"Server under maintenance"], 500);
        }
    }
    public function verifyticket(Request $request)
    {
        $transaction = Transaction::where('transaction_id',$request->transaction_id)->first();
        //echo $transaction;
        if($transaction->status == "paid"){
            $ticket = Ticket::where('id', $transaction->ticket_id)->first();
            if($ticket->status == "used" || $ticket->status == "refunded"){
                return response(['message' => "Ticket Verification Failed",'code' =>'201']);
            }
            else if($ticket->status == "active"){
                $ticket->status = "used";
                $ticket->save();
                $status = "valid";
                return response(['message' => "Ticket Verification Success",'code' =>'200']);
                }
        }

    }
}
