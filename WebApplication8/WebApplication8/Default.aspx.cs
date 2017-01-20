using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication8
{
    public partial class _Default : Page
    {
        private string selectObsInt = "";

        public string selectObservaciones
        {
            get
            {
                selectObsInt = asignarValor();
                return selectObsInt;
            }
            set
            {
                selectObsInt = asignarValor();
            }
        }


        private string mySeparator = "";

        public string MySeparator
        {
            get 
            {
                mySeparator = System.Globalization.CultureInfo.CurrentCulture.NumberFormat.CurrencyGroupSeparator;
                return mySeparator;
            }
            set
            {
                mySeparator = System.Globalization.CultureInfo.CurrentCulture.NumberFormat.CurrencyGroupSeparator;
            }
        }

        private string asignarValor()
        {
            string cadena = "";

            cadena = "<select name='select' style='width:150px;height:25px' > ";
            cadena += "<option value='' selected> ------------------------ </option> "; 
            cadena += "<option value='ABASTECIMIENTO PROGRAMADO'>ABASTECIMIENTO PROGRAMADO</option> ";
            cadena += "<option value='ADELANTO POR SITE'>ADELANTO POR SITE</option> ";
            cadena += "<option value='AUTOABASTECIMIENTO'>AUTOABASTECIMIENTO</option> ";
            cadena += "<option value='BVD SATELITE'>BVD SATELITE</option> ";
            cadena += "<option value='BVD 720'>BVD 720</option> ";
            cadena += "<option value='BVD 720 MALETIN'>BVD 720 MALETIN</option> ";
            cadena += "<option value='CONDICION DE RUTA DIEBOLD'>CONDICION DE RUTA DIEBOLD</option> ";
            cadena += "<option value='CONDICION DE RUTA VALOR'>CONDICION DE RUTA VALOR</option> ";
            cadena += "<option value='DIFERIDO POR SITE'>DIFERIDO POR SITE</option> ";
            cadena += "<option value='FALLA DE COMUNICACION'>FALLA DE COMUNICACION</option> ";
            cadena += "<option value='FALLA EN EL ATM'>FALLA EN EL ATM</option> ";
            cadena += "<option value='SALDO NO ACTUALIZADO'>SALDO NO ACTUALIZADO</option> ";
            cadena += "<option value='SOLICITUD POR COORDINADOR'>SOLICITUD POR COORDINADOR</option> ";
            cadena += "<option value='SALDO SUFICIENTE'>SALDO SUFICIENTE</option> ";
            cadena += "<option value=''>OTRO</option> </select>";

            return cadena; 
        }

        protected void Page_Load(object sender, EventArgs e)
        {

            miSeparadorMiles.Value = this.MySeparator;
            System.Data.SqlClient.SqlConnection conexion = new System.Data.SqlClient.SqlConnection();
            conexion.ConnectionString = "Data Source=CCSBD01;Database=DBVantiveReport;User ID=vantivereport;Password=V@nt1v3";
            conexion.Open();

            string cadena = "Select top 5  replace(replace(swPersonId, ',00000', ''), '.00000', '') as swPersonId,	swCustomerId,	swFirstName,	swMiddleName, swDateCreated  from sw_Person ";
            System.Data.SqlClient.SqlCommand comando = new System.Data.SqlClient.SqlCommand(cadena, conexion);

            System.Data.SqlClient.SqlDataAdapter adaptador = new System.Data.SqlClient.SqlDataAdapter();
            adaptador.SelectCommand = comando;

            System.Data.DataTable miDataSet = new System.Data.DataTable(); 
            adaptador.Fill(miDataSet);
            GridView1.DataSource = miDataSet;
            GridView1.DataBind();

        }

        protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e) 
        {
            GridViewRow r = e.Row;
            if(r.RowType == DataControlRowType.DataRow)
            {
                int contador = 0;

foreach (TableCell c in r.Cells)
            {                
                c.Style.Add("white-space", "nowrap");
                c.Style.Add("font-size", "small");                

                if (contador == 4)  
                {
                    string cadenaHipervinculo = ""; 
                    string tituloMensaje = "Notas1 = " + "TITU";
                    string cuerpoMensaje = "Notas2 = "  + "CUER";

                    cadenaHipervinculo = "<a  id='aHef_" + contador.ToString() + "' href='#' data-toggle='popover' data-html='true'  title='" + tituloMensaje + "' data-content='" + cuerpoMensaje + "'>";

                    //cadenaHipervinculo = "<a onclick='return false;' data-toggle='popover' data-content='" + cuerpoMensaje + "' id='aHef_" + contador.ToString() + "' title='" + tituloMensaje + "' href='#'>";
                    
                    cadenaHipervinculo += c.Text.ToString().Trim() + "</a>";
                    c.Text = cadenaHipervinculo;
                    

                }
    
                    contador++;

                }

            }
        }

    }
}