<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebApplication8._Default" %>

<asp:Content runat="server" ID="FeaturedContent" ContentPlaceHolderID="FeaturedContent">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <link href="Scripts/jqueryUI/jquery-ui.css" type="text/css" rel="stylesheet">    

    <link href="media/css/bootstrap.minV_3_JC_NEW.css" type="text/css" rel="stylesheet">

    <script type="text/javascript" src="Scripts/jquery-2.1.1.min.js"></script>
    
    <script type="text/javascript" src="Scripts/jqueryUI/jquery-ui.js"></script>

    <script type="text/javascript" src="Scripts/jquery.yesnoV3_JC.js"></script>

    <script type="text/javascript" src="Scripts/bootstrap.minV3_JC_NEW.js"></script>

    <link href="media/css/bootstrap-multiselectV3_JC.css" type="text/css" rel="stylesheet">

    <script type="text/javascript" src="Scripts/bootstrap-multiselectV3_JC.js"></script>  

    <script type="text/javascript" src="Scripts/jquery.dialogextend.min.js"></script>

    <LINK href="Scripts/BootDatePi/bootstrap-datetimepicker.css" rel="stylesheet">  
        
<SCRIPT type="text/javascript" src="Scripts/BootDatePi/moment-with-locales.js"></SCRIPT>                  
<SCRIPT type="text/javascript" src="Scripts/BootDatePi/bootstrap-datetimepicker.js"></SCRIPT> 

    <script type="text/javascript">

        //var symbolGeneral = $("#MainContent_miSeparadorMiles").val();

        function formatNumber(value) {
            var numbers = new Array();
            var symbol = $("#MainContent_miSeparadorMiles").val(); // symbolGeneral;
            //var symbol = "."; //Éste es el separador
            value = value.toString();
            value = value.replace(/\D/g, "");   //Ésta expresión regular solo permitira ingresar números
            numbers = value.split(""); //Se vacia el valor en un arreglo
            var long = numbers.length - 1; // Se saca la longitud del arreglo
            var pattern = 3; //Indica cada cuanto se ponen los puntos
            var next = 2; // Indica en que lugar se debe insertar el siguiente punto
            var response = "";

            while (long > next) {
                numbers.splice((long - next), 0, symbol); //Se agrega la coma
                next += pattern; //Se incrementa la posición próxima para colocar la coma
            }

            for (var i = 0; i <= numbers.length - 1; i++) {
                response += numbers[i]; //Se crea la nueva cadena para devolver el valor formateado
            }

            return response;
        }

            $(document).ready(function () {

                $('[data-toggle="popover"]').popover({

                    html: true,
                    placement: "left"

                });


                

                $("#MainContent_GridView1_txtObserv_1820").keyup(function () {
                    var valueCurrent = $(this).val();
                    var newValue = formatNumber(valueCurrent);
                    $(this).val(newValue);
                });

                
                   // alert(symbolGeneral);

                

            });

            function assignValue(id) {

                $("#hid_" + id).val($("#textJ").val());

                if ($("#hid_" + id).val() != '') {
                    $('#MainContent_GridView1_txtObserv_' + id).val($("#hid_" + id).val());
                }
                return true;
            }


            $("#txtObserv").keyup(function () {

                this.value = parseFloat(this.value.replace(/,/g, ""))
                                  .toFixed(2)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            });

    </script>

    <section class="featured">
        <div class="content-wrapper">


        </div>
    </section>
</asp:Content>




<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent" >

    <input type="hidden" runat="server" value="" id="miSeparadorMiles" />

            <asp:GridView ID="GridView1" ClientIDMode="Predictable" runat="server" OnRowDataBound="GridView1_RowDataBound" ClientIDRowSuffix="swPersonId">



                <Columns>                                                
            <asp:BoundField DataField="swPersonId" HeaderText="ID" ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign = "Center" /> 

            <asp:BoundField DataField="swCustomerId" HeaderText="Zona" ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign ="Center" />                            
            <asp:BoundField DataField="swFirstName" HeaderText="swFirstName" ItemStyle-HorizontalAlign="Left" HeaderStyle-HorizontalAlign ="Center" />                            
            <asp:BoundField DataField="swMiddleName" HeaderText="swMiddleName" ItemStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign ="Center" />  
            <asp:BoundField DataField="swPersonId" HeaderText="hipervin" ItemStyle-HorizontalAlign="Center"  HeaderStyle-HorizontalAlign ="Center" /> 
           
            <asp:TemplateField HeaderText="swMiddleName" HeaderStyle-HorizontalAlign ="Center" >
                <ItemTemplate>
                    <div class="container">
                        <div>
                            <div class="form-group" >

                            <span class="input-group-addon"> 
                                <button type="button" id='but_<%# Eval("swPersonId") %>' onclick="assignValue('<%# Eval("swPersonId") %>');" class="glyphicon glyphicon-list" data-toggle="popover" title="Observacion - <%# Eval("swPersonId") %>" data-content="<script type='text/javascript'> $(document).ready(function(){ $('select[name=select]').change(function(){ $('input[name=text]').val($(this).val());  $('hid_<%# Eval("swPersonId") %>').val($(this).val());    });   }); </script> <%# this.selectObservaciones %> <input type='text' id='textJ' name='text' value='' placeholder='Observacion' style='width:230px;height:15px'> "></button>
                                <input type="hidden" value = '' id='hid_<%# Eval("swPersonId") %>'/>

                            </span>  
                            <span class="input-group-addon" >  
                                <asp:TextBox ID="txtObserv" Text='<%# Eval("swMiddleName") %>'  runat="server" style='width:120px;height:15px;'></asp:TextBox>
                            </span>  
                            
                            </div>
                            
                        </div>
                    </div>      
                </ItemTemplate>
            </asp:TemplateField> 

                                                                                                                                                           
        </Columns>

            </asp:GridView>


</asp:Content>
