$(document).ready(function(){

    // jQuery('#mymodal').trigger('click');
    var cards = [];
    var knobs_tracker = [];
    var keep_flow_tracker = [];
    $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", $("[name=csrfmiddlewaretoken]").val());
                }
            }
    });

    ///////// To add scroll down function /////////
    $(document).on('click','#add_row_btn', function() {
        $('html, body').scrollTop($("#send_order_btn").offset().top);
    });



    $(document).on('keydown','input[type="text"]', function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            event.preventDefault();
            console.log("Not allowed to press the Enter Key");
            return false;

        }
    });
    //lock the above fields
    function lock_fields(){
        $(`.keep_flow_decision_btn`).prop('disabled',true);
        $(`select[name="collection_barcode[]"]`).attr("readonly", "readonly");
        $(`select[name="knob_family[]"]`).attr("readonly", "readonly");
        $(`select[name="knob_color[]"]`).attr("readonly", "readonly");
        $(`input[type="file"]`).css('pointer-events','none');
        $(`input[type="radio"]`).prop('readonly',true);
        $(`select[name="texture[]"]`).css('pointer-events','none');
    }

    //lock the fields
    $(document).on('keyup','#height_1', function(){
        lock_fields();
    });
    
        // let inputs_table = ["input[name='width[]']", "input[name='height[]']", "input[name='quantity[]']"];

        $(document).on('keypress', function(e) {
            if (event.key === "Enter" || event.keyCode === 13) {
                e.preventDefault();
                console.log("Not allowed to press the Enter Key");
                return false;
            }
        });
    
    
    // Apply the function to input fields with class 'float-input'
    // $('.float-input').allowFloatOnly();

  
    function subform_generation(counter){
        let token = $("[name=csrfmiddlewaretoken]").val();

        return `<div id="drills_${counter}" modal-center class="text-right fixed flex flex-col top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 w-fit border border-dark-500 hide-modal transition-all duration-300 ease-in-out">
                    <div class="w-full bg-white shadow rounded-md dark:bg-zink-700 dark:text-zink-200 dark:shadow">
                        <div class="flex items-center justify-between p-4 border-b border-gray-300 dark:border-zink-50"> 
                            

                             <button data-id="drills_${counter}" type="button" class=" close_modal btn" style="font-size: 20px;font-weight: 600;color: black;">x</button>
                        </div>
                                                            <div class="p-4" id ="drills_${counter}_body">
                                                                <div class="md:col-span-12 md-2 entry_selector_div" id="entry_selector_${counter}">
                                                                    <div>
                                                                        <label for="" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.choose_entry_type}</label>
                                                                        <select class="col-span-12 sm:col-span-10 px-3 bg-white w-full border p-2 border-gray-400 rounded placeholder:text-sm focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-zink-700 dark:border-zink-50 dark:text-zink-200 entry_selector" name="entry_selector_${counter}" data-id="${counter}">
                                                                            <option value="" disabled selected>${window.page.choose_entry_type}</option>
                                                                            <option value="drawer_sub_details_${counter}">${window.page.drawer}</option>
                                                                            <option value="claps_sub_details_${counter}">${window.page.claps}</option>
                                                                            <option value="hinge_sub_details_${counter}">${window.page.hinge}</option>                                
                                                                        </select>
                                                                    </div>
                                                                </div>




                                                                                                            <form style="display:none;" method="POST" class="subform_temp" id="drawer_sub_details_${counter}">

                                                                                                                 <input type="hidden" name="subform_type" value="drawer">

                                                                                                                 <input type="hidden" name="csrfmiddlewaretoken" value="${token}">

                                                                                                                <h6 class="text-15 font-semibold dark:text-white mb-4 mt-4">${window.page.DrawerDetails}</h6>

                                                                                                                <div class="grid grid-cols-12 gap-x-4 md:gap-4" id="drawer_details_${counter}">
                                                                                                                        
                                                                                                                            <div class="md:col-span-2">
                                                                                                                                    <div>
                                                                                                                                        <label for="" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.DrawerType}</label>
                                                                                                                                        <select class="col-span-12 sm:col-span-10 px-3 bg-white w-full border p-2 border-gray-400 rounded placeholder:text-sm focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700  dark:bg-zink-700 dark:border-zink-50 dark:text-zink-200" required name="drawers_type" id="drawers_type_${counter}">
                                                                                                                                            
                                                                                                                                        </select>
                                                                                                                                    </div>
                                                                                                                            </div>
                                                                                                                

                                                                                                                
                                                                                                                            <div class="md:col-span-2">
                                                                                                                                    <div>
                                                                                                                                        <label class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200" for="grid-first-name">
                                                                                                                                            ${window.page.DrawerCode}
                                                                                                                                        </label>
                                                                                                                                        <select class="col-span-12 sm:col-span-10 px-3 bg-white w-full border p-2 border-gray-400 rounded placeholder:text-sm focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700  dark:bg-zink-700 dark:border-zink-50 dark:text-zink-200" required name="drawers_code" id="drawers_code_${counter}">
                                                                                                                                        </select>
                                                                                                                                    </div>
                                                                                                                            </div>
                                                                                                                

                                                                                                                            <div class="md:col-span-2">
                                                                                                                                <div>
                                                                                                                                    <label for="" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.lo}</label>
                                                                                                                                    <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" required name="lo" id="lo_${counter}">
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                            <div class="md:col-span-2">
                                                                                                                                <div>
                                                                                                                                    <label for="" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.ro}</label>
                                                                                                                                    <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" required name="ro" id="ro_${counter}">
                                                                                                                                </div>
                                                                                                                            </div>


                                                                                                                            <div class="md:col-span-2">
                                                                                                                                <div>
                                                                                                                                    <label for="" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.drawerBo}</label>
                                                                                                                                    <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" required name="bo" id="bo_${counter}">
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                            <div class="md:col-span-2  mt-7">
                                                                                                                                <div>
                                                                                                                                    <button type="submit" id="drawer_submit_${counter}" name="drawer_submit_${counter}" class="text-white transition-all duration-300 ease-linear bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white active:bg-blue-600 active:border-blue-600 active:text-white focus:bg-blue-600 focus:border-blue-600 focus:text-white focus:ring focus:ring-blue-500/30 btn">${window.page.submit}</button>

                                                                                                                                     <button type="button" data-id="drills_${counter}" class="close_modal mr-2 text-white transition-all duration-300 ease-linear bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 hover:text-white active:bg-red-600 active:border-red-600 active:text-white focus:bg-red-600 focus:border-red-600 focus:text-white focus:ring focus:ring-red-500/30 btn">${window.page.close}</button>
                                                                                                                                   
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                </div>

                                                                                                            </form>


                                                                                                            <form style="display:none;" method="POST" class="subform_temp" id="claps_sub_details_${counter}">
                                                                                                                <input type="hidden" name="subform_type" value="claps">
                                                                                                                <input type="hidden" name="csrfmiddlewaretoken" value="${token}">
                                                                                                                <h6 class="text-15 font-semibold dark:text-white mb-4 mt-4">${window.page.ClapsDetails}</h6>
                                                                                                                <div class="grid grid-cols-12 gap-x-4 md:gap-4 mb-4 mt-4" id="claps_${counter}_details">
                                                                                                                        
                                                                                                                            <div class="md:col-span-2">
                                                                                                                                    <div>
                                                                                                                                        <label for="clap_pr" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.ClapsPr}</label>
                                                                                                                                        <select class="col-span-12 sm:col-span-10 px-3 bg-white w-full border p-2 border-gray-400 rounded placeholder:text-sm focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700  dark:bg-zink-700 dark:border-zink-50 dark:text-zink-200" required name="clap_pr" id="clap_pr_${counter}">
                                                                                                                                        </select>
                                                                                                                                    </div>
                                                                                                                            </div>

                                                                                                                            <div class="md:col-span-2">
                                                                                                                                <div>
                                                                                                                                    <label for="lo" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.lo}</label>
                                                                                                                                    <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" required name="lo" id="lo_${counter}">
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                            <div class="md:col-span-2">
                                                                                                                                <div>
                                                                                                                                    <label for="ro" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.ro}</label>
                                                                                                                                    <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" required name="ro" id="ro_${counter}">
                                                                                                                                </div>
                                                                                                                            </div>


                                                                                                                            <div class="md:col-span-2">
                                                                                                                                <div>
                                                                                                                                    <label for="bo" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.bo}</label>
                                                                                                                                    <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" required name="bo" id="bo_${counter}">
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                            <div class="md:col-span-2  mt-7">
                                                                                                                                <div>
                                                                                                                                    <button type="submit" id="claps_submit_${counter}" name="claps_submit_${counter}" class="text-white transition-all duration-300 ease-linear bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white active:bg-blue-600 active:border-blue-600 active:text-white focus:bg-blue-600 focus:border-blue-600 focus:text-white focus:ring focus:ring-blue-500/30 btn">${window.page.submit}</button>

                                                                                                                                    <button type="button" data-id="drills_${counter}" class="close_modal mr-2 text-white transition-all duration-300 ease-linear bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 hover:text-white active:bg-red-600 active:border-red-600 active:text-white focus:bg-red-600 focus:border-red-600 focus:text-white focus:ring focus:ring-red-500/30 btn">${window.page.close}</button>
                                                                                                                                   
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                    </div>
                                                                                                            </form>


                                                                                                            <form style="display:none;" method="POST" class="subform_temp" id="hinge_sub_details_${counter}">
                                                                                                            <input type="hidden" name="csrfmiddlewaretoken" value="${token}">
                                                                                                                <input type="hidden" name="subform_type" value="hinge">

                                                                                                                <h6 class="text-15 font-semibold dark:text-white mb-4">${window.page.HingeDetails}</h6>
                                                                                                                <div class="grid grid-cols-12 gap-x-4 md:gap-4 mb-4" id="hinge_details_${counter}">
                                                                                                                         
                                                                                                                        <div class="md:col-span-4">
                                                                                                                                <div>
                                                                                                                                    <label for="hinge_provider" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.HingeProvider}</label>
                                                                                                                                    <select class="col-span-12 sm:col-span-10 px-3 bg-white w-full border p-2 border-gray-400 rounded placeholder:text-sm focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700  dark:bg-zink-700 dark:border-zink-50 dark:text-zink-200"  required name="hinge_provider" id="hinge_provider_${counter}">
                                                                                                                                    </select>
                                                                                                                                </div>
                                                                                                                        </div>

                                                                                                                        <div class="md:col-span-4">
                                                                                                                                <div>
                                                                                                                                    <label for="door_operning_side" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.DoorOpeningSide}</label>
                                                                                                                                    <select class="col-span-12 sm:col-span-10 px-3 bg-white w-full border p-2 border-gray-400 rounded placeholder:text-sm focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700  dark:bg-zink-700 dark:border-zink-50 dark:text-zink-200"  required name="door_operning_side" id="door_operning_side_${counter}">
                                                                                                                                       
                                                                                                                                        
                                                                                                                                        
                                                                                                                                    </select>
                                                                                                                                </div>
                                                                                                                        </div>


                                                                                                                        <div class="md:col-span-4">
                                                                                                                            <div>
                                                                                                                                <label for="dty" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.dty}</label>
                                                                                                                                <select class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" required name="dty" id="dty_${counter}">
                                                                                                                                    <option value="${window.page.dty_option1}">${window.page.dty_option1}</option>
                                                                                                                                    <option value="${window.page.dty_option2}">${window.page.dty_option2}</option>
                                                                                                                                </select>



                                                                                                                            </div>
                                                                                                                        </div>

                                                                                                                        <div class="md:col-span-4 mt-4">
                                                                                                                            <div>
                                                                                                                                <label for="yp" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.yp}</label>
                                                                                                                                <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" required name="yp" id="yp_${counter}">
                                                                                                                            </div>
                                                                                                                        </div>

                                                                                                                        <div class="md:col-span-4 mt-4">
                                                                                                                            <div>
                                                                                                                                <label for="nh" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.nh}</label>
                                                                                                                                <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200 nh_counter_field" data-id="${counter}" required name="nh" type="text" id="nh_${counter}">
                                                                                                                            </div>
                                                                                                                        </div>


                                                                                                                        <div class="md:col-span-4 xp1_div_${counter} mt-4" style="display:none;">
                                                                                                                                <div>
                                                                                                                                    <label for="xp1" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.xp1}</label>
                                                                                                                                    <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" name="xp1" id="xp1_${counter}">
                                                                                                                                </div>
                                                                                                                        </div>

                                                                                                                        <div class="md:col-span-4 xp2_div_${counter} mt-4" style="display:none;">
                                                                                                                            <div>
                                                                                                                                <label for="xp2" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.xp2}</label>
                                                                                                                                <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" name="xp2" id="xp2_${counter}">
                                                                                                                            </div>
                                                                                                                        </div>

                                                                                                                        <div class="md:col-span-4 xp3_div_${counter} mt-4" style="display:none;">
                                                                                                                            <div>
                                                                                                                                <label for="xp3" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.xp3}</label>
                                                                                                                                <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" name="xp3" id="xp3_${counter}">
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                         <div class="md:col-span-4 xp4_div_${counter} mt-4" style="display:none;">
                                                                                                                            <div>
                                                                                                                                <label for="xp4" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.xp4}</label>
                                                                                                                                <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" name="xp4" id="xp4_${counter}">
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div class="md:col-span-4 xp5_div_${counter} mt-4" style="display:none;">
                                                                                                                            <div>
                                                                                                                                <label for="xp5" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.xp5}</label>
                                                                                                                                <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" name="xp5" id="xp5_${counter}">
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                         
                                                                                                                        <div class="md:col-span-4 xp6_div_${counter} mt-4" style="display:none;">
                                                                                                                            <div>
                                                                                                                                <label for="xp6" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.xp6}</label>
                                                                                                                                <input class="w-full border py-2 px-3 text-13 rounded border-gray-400 placeholder:text-13 focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent placeholder:text-gray-600 dark:border-zink-50 dark:placeholder:text-zink-200" name="xp6" id="xp6_${counter}">
                                                                                                                            </div>
                                                                                                                        </div>


                                                                                                                        <div class="md:col-span-2 mt-10">
                                                                                                                            <div>
                                                                                                                                <button type="submit" id="hinge_submit_${counter}" name="hinge_submit_${counter}"  class="text-white transition-all duration-300 ease-linear bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white active:bg-blue-600 active:border-blue-600 active:text-white focus:bg-blue-600 focus:border-blue-600 focus:text-white focus:ring focus:ring-blue-500/30 btn">${window.page.submit}</button>

                                                                                                                                    <button type="button" data-id="drills_${counter}" class="close_modal mr-2 text-white transition-all duration-300 ease-linear bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 hover:text-white active:bg-red-600 active:border-red-600 active:text-white focus:bg-red-600 focus:border-red-600 focus:text-white focus:ring focus:ring-red-500/30 btn">${window.page.close}</button>
                                                                                                                                   
                                                                                                                               
                                                                                                                            </div>



                                                                                                                        </div>

                                                                                                                </div>
                                                                                                            </form>


                                                                                                </div>



                                                                                            </div>
                                                                                    </div>`;


    }//ends subform_generation here


    // $(".nh_counter_field").on("keydown", function(event) { if (event.key === "ArrowUp" || event.key === "ArrowDown") { event.preventDefault(); } });
    //var nh_counter_field = $('.nh_counter_field').val();
    $(document).on('keyup', '.nh_counter_field', function(event){
       
            console.log("I am working true");
            let data_id = $(this).attr("data-id");
            let total_xp = parseInt($(this).val());
            if ($(this).val() !== "" && total_xp <=6){

                for (let i=0; i < 6; i++ )
                    $(`.xp${i+1}_div_${data_id}`).hide();
                
                for (let i=0; i < total_xp; i++ )
                    $(`.xp${i+1}_div_${data_id}`).show();
            }else{
                $(this).val("");
                for (let i=0; i < 6; i++ )
                    $(`.xp${i+1}_div_${data_id}`).hide();
            }
        //console.log(data_id);
        
    });


    function notes_form_generation(row_count){
        let token = $("[name=csrfmiddlewaretoken]").val();
        return `<div id="drills_${row_count}_notes" modal-center class="text-right fixed flex flex-col top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 w-fit hide-modal border border-dark-500 transition-all duration-300 ease-in-out">
                    <div class="w-full bg-white shadow rounded-md dark:bg-zink-700 dark:text-zink-200 dark:shadow">
                        <div class="hide_ flex items-center justify-between p-4 border-b border-gray-300 dark:border-zink-50"> 
                             <button data-id="drills_${row_count}_notes" type="button" class=" close_modal btn" style="font-size: 20px;font-weight: 600;color: black;">x</button>
                        </div>
                                                                                                

                                                                                                <div class="p-4" id ="drills_${row_count}_notes_body">

                                                                                                            <form method="POST" id="notes_details_${row_count}" class="subform_temp">
                                                                                                                 <input type="hidden" name="csrfmiddlewaretoken" value="${token}">
                                                                                                                <h6 class="text-15 font-semibold dark:text-white mb-4">
                                                                                                                        ${window.page.notes}
                                                                                                                </h6>

                                                                                                                <div class="grid grid-cols-12" id="notes_details_${row_count}">
                                                                                                                        
                                                                                                                        
                                                                                                                <input type="hidden" name="subform_type" value="notes">
                                                                                                                                
                                                                                                                        <div class="md:col-span-12">
                                                                                                                                       
                                                                                                                                        <textarea class="px-3 w-full border p-2 border-gray-400 rounded placeholder:text-13 focus:border focus:border-gray-400 placeholder:text-gray-600 focus:ring-0 focus:outline-none text-gray-700 text-13 dark:bg-transparent dark:border-zink-50 dark:text-zink-200 dark:placeholder:text-zink-200" rows="3" id="notes_${row_count}" name="notes" required></textarea>
                                                                                                                        </div>

                                                                                                                          

                                                                                                                            <div class="md:col-span-4 mt-7">
                                                                                                                                <div>
                                                                                                                                        <button type="submit" class="text-white transition-all duration-300 ease-linear bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white active:bg-blue-600 active:border-blue-600 active:text-white focus:bg-blue-600 focus:border-blue-600 focus:text-white focus:ring focus:ring-blue-500/30 btn">${window.page.submit}</button>
                                                                                                                                        
                                                                                                                                        <button type="button" data-id="drills_${row_count}_notes" class="close_modal mr-2 text-white transition-all duration-300 ease-linear bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 hover:text-white active:bg-red-600 active:border-red-600 active:text-white focus:bg-red-600 focus:border-red-600 focus:text-white focus:ring focus:ring-red-500/30 btn">${window.page.close}</button>
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                </div>

                                                                                                            </form>


                                                                                                            


                                                                                                </div>



                                                                                            </div>
                                                                                    </div>`;

    }

    $(document).on('change','.entry_selector', function(){
        let selected_entry = $(this).find(":selected").val();
        let data_id = $(this).attr('data-id');
        
        $(`#drills_${data_id} .subform_temp`).hide();
        $(`#${selected_entry}`).show();
        $('.entry_selector_div').addClass('hide_');
        // $(this).prop("disabled", true); // Disable the select element
    });


     function updateOrPush(arr, key, newValue) {
        let keyExists = false;

        // Iterate through the array to check if the key exists
        arr.forEach(obj => {
            if (obj.hasOwnProperty(key)) {
                obj[key] = newValue;
                keyExists = true;
            }
        });

        // If the key does not exist, push a new object with the key-value pair
        if (!keyExists) {
            let newObj = {};
            newObj[key] = newValue;
            arr.push(newObj);
        }

        return arr;
    }

    $(document).on('click','.keep_flow_decision_btn',function(){
        let step_count = $(this).attr('data-id');
        let label = $(this).attr('data-label');
        let value_  = $(`#collection_barcode_${step_count}`).find(':selected').val();
        
        keep_flow_tracker = updateOrPush(keep_flow_tracker, value_, label);

        console.log("label",label);
        console.log("step_count",step_count);
        console.log(keep_flow_tracker);
        $(`div#create_order_form_step_${step_count} .keep_flow_decision_btn`).removeClass('active-button');
        $(this).addClass('active-button');

        // let input = `<input type="hidden" name="keepflow_${step_count}" class="keepflow_counter" id="keepflow_${step_count}" value="${label}">`;
        // let input = `<input type="hidden" name="keepflow[]" class="keepflow_counter" id="keepflow_${step_count}" value="${label}">`;
        // $(`#keep_flow_tracker_step_${step_count} #keepflow_${step_count}`).empty().append(input);

        $(`#keep_flow_tracker_step_${step_count} #keepflow_${step_count}`).val(`label`);
    });


    // $("#create_order_form_step_2").hide();
    // console.log("I am")
    $(document).on('click','#create_order_form_next_btn_step_1',function(){
        $("#step").val("step_1");
        let client_order_name = $("#client_order_name").val().trim();
        let client_order_id = $("#client_order_id").val().trim();
        let order_id = $("#order_id").val().trim();
        let have_past_order = $("#have_past_order").val();
        let past_order_id = $("#past_order_id").val();
        
        if (client_order_name!='' || client_order_id!=''){
            let request_status_step1 = $("#request_status_step1").val().trim();
            let request_status_step1_user_id = $("#request_status_step1_user_id").val().trim();
            let step  = $("#step").val().trim();
            let product_type = $("#product_type").val();
            $.ajax({
                url:$("#link_to_add_").val(), // add url for posting request
                method:'POST',
                data:{
                    client_order_name:client_order_name, 
                    client_order_id:client_order_id,
                    order_id:order_id,
                    request_status_step1:request_status_step1,
                    request_status_step1_user_id:request_status_step1_user_id,
                    step:$("#step").val(),
                    action:$("#action").val(),
                    product_type:product_type,
                    have_past_order:have_past_order,
                    past_order_id:past_order_id
                },
                dataType:'JSON',
                success:function(data){
                    if (data.success == 1){
                        $("#create_order_form_step_2").show();


                        // $("#create_order_form_step_1").hide();
                        $("#step").val("");
                        // $("#client_order_name").attr('readonly',true);
                        // $("#client_order_id").attr('readonly',true);
                        // $("#create_order_form_next_btn_step_1").attr('disabled',true);
                        $("#create_order_form_next_btn_step_1").remove();
                        $("input[name='color_selection']").attr('disabled',false);
                        $("#next_error_div").addClass('hide_');
                            // Swal.fire(
                            //     {
                            //         title: window.page.step_1_details_saved_success,
                            //         text: window.page.step_1_details_msg_success,
                            //         icon: 'success',
                            //         showConfirmButton: false,
                            //         timer: 3000
                            //     }
                            // );
                    }else if(data.success == 0){
                         Swal.fire(
                                {
                                    title: window.page.error,
                                    text: data.msg,
                                    icon: 'warning',
                                    showConfirmButton: false,
                                    timer: 3000
                                }
                        );
                    }
                }  //end success here
            }); //end ajax call here
        } // end if here
        else{
            Swal.fire({
                    // position: 'center',
                    icon: 'warning',
                    title: window.page.step_1_details_msg_warning,
                    showConfirmButton: false,
                    timer: 1500
            });
            $("#next_error_div").removeClass('hide_');
        }



    }); //end create_order_form_next_btn_step_1 event here


    
    function get_collection(callback, step_number, element_names, keys){
        $.ajax({
                url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
                method:'POST',
                data:{
                    data_requirement:'collection', 
                },
                dataType:'JSON',
                success:function(data){
                    callback(data, step_number, element_names, keys);
                }
        }); //end ajax call here
       
    } //end get_collection func here

    


    function get_knob_family(callback, step_number, element_names, keys){
        $.ajax({
                url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
                method:'POST',
                data:{
                    data_requirement:'knob_family', 
                },
                dataType:'JSON',
                success:function(data){
                    callback(data, step_number, element_names, keys);
                }
        }); //end ajax call here
       
    } //end get_knob_family func here



    function get_drawer(callback, step_number, element_names, keys){
        $.ajax({
                url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
                method:'POST',
                data:{
                    data_requirement:'drawer', 
                },
                dataType:'JSON',
                success:function(data){
                    callback(data, step_number, element_names, keys);
                }
        }); //end ajax call here
       
    } //end get_drawer func here



    function handledrawerData(drawerData, step_number, element_names, keys) {
            if (drawerData !== null) {
                $.each(keys, function(index,key){
                    console.log(index, key);
                    let elem_name = `div#create_order_form_step_${step_number} select[name='${element_names[index]}']`;
                    // console.log(elem_name);
                    var selectElement =  $(elem_name);
                    // console.log(selectElement);
                    if (selectElement){
                        // console.log("selectElement found",selectElement);
                            $.each(drawerData.data, function (index, item) {
                                console.log(item);
                                selectElement.append($('<option>', {
                                value: item[key],
                                text: item[key]
                            }
                            ));
                        }); //end second each
                    }
                }); // end first each
            } else{
                console.log("Error at handledrawerData func");
            }
    } //end handleCollectionData here


    function handleCollectionData(collectionData, step_number, element_names, keys) {
            if (collectionData !== null) {
                $.each(keys, function(index,key){
                    // console.log(index, key);
                    let elem_name = `div#create_order_form_step_${step_number} select[name='${element_names[index]}']`;
                    // console.log(elem_name);
                    var selectElement =  $(elem_name).empty();

                    selectElement.append($('<option>', {
                            value: '',
                            text: window.page.select_a_value
                        }
                    ));

                    // console.log(selectElement);
                    if (selectElement){
                        // console.log("selectElement found",selectElement);
                            $.each(collectionData.data, function (index, item) {
                                    // console.log(item);
                                    if (item.in_stock_bool == 1){
                                        selectElement.append($('<option>', {
                                                value: item[key],
                                                text: item[key],
                                                'data-id':item['collection_id'],
                                                'data-flow':item['flow'],
                                                'data-back':item['back'],
                                                'data-kant':item['kant'],
                                                'data-minorder':item['min_order'],
                                                'data-collection':item['collection_name'],
                                                 'data-description':item['description'],


                                            }
                                         ));
                                    }


                        }); //end second each
                    }
                }); // end first each
            } else{
                console.log("Error at handleCollectionData func");
            }
    } //end handleCollectionData here


    

    function handleKnobFamilyData(collectionData, step_number, element_names, keys) {
            if (collectionData !== null) {
                $.each(keys, function(index,key){
                    // console.log(index, key);
                    let elem_name = `div#create_order_form_step_${step_number} select[name='${element_names[index]}']`;
                    var selectElement =  $(elem_name);
                    if (selectElement){
                        // console.log("selectElement found",selectElement);
                        
                            selectElement.append($('<option>', {
                                        value: '',
                                        text: window.page.select_a_value
                                }
                            ));


                            $.each(collectionData.data, function (index, item) {
                                
                                selectElement.append($('<option>', {
                                    value: item[key],
                                    text: item[key],
                                    'data-id': item['knob_color_bool'],
                                }
                            ));
                        }); //end second each
                    }
                }); // end first each
            } else{
                console.log("Error at handleKnobFamilyData func");
            }
    } //end handleKnobFamilyData here







    $(document).on('change','input[type="file"]',function(event){

                const selectedFile = event.target.files[0];
                const fileName = selectedFile.name.toLowerCase();
                let all_exts = ['.png','.jpg','jpeg','.gif']
                if (all_exts.some(ext => fileName.endsWith(ext))) {
                    
                    let id_ = $(this).attr('id');
                    console.log('Valid file selected:', fileName);
                    console.log('id_:', id_);
                    $(`#upload_file_tracker_${id_}`).val(1);
                    // Handle the file or perform further actions
                } else {
                    let error_msg = window.page.image_error_msg;
                    Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: error_msg,
                            showConfirmButton: false,
                            timer: 3000
                    });
                    // Clear the file input
                    $('#upload_file').val('');
                }
        
    });


    function html_fields_generation(decision, target_count){
        let text_mapper = window.page.collection_barcode;
        
        let d = $("#decision").val();
        if (d == "yes")
            text_mapper = window.page.collection_barcode1;

        let html_ = [`<div class="md:col-span-6">
                                                        <div>
                                                            <label for="collection_barcode" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${text_mapper}</label>
                                                            <select class="use_select2 col-span-12 sm:col-span-10 px-3 bg-white w-full border p-2 border-gray-400 rounded placeholder:text-sm focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-zink-700 dark:border-zink-50 dark:text-zink-200"  name="collection_barcode[]" data-id="${target_count}"  id="collection_barcode_${target_count}" required>
                                                               
                                                                
                                                            </select>
                                                        </div>
                                                </div>

                                                <div class="md:col-span-6">
                                                        

                                                        <table id="collection_table_${target_count}" class="w-full text-sm ltr:text-left rtl:text-right text-gray-500" style="display:none;">
                                                                
                                                            <thead class="text-sm text-gray-700 dark:text-zink-200">
                                                                    <tr class="border border-gray-300 dark:border-zink-50">
                                                                        <th scope="col" class="p-3 font-semibold border-l dark:border-zink-50 border-gray-300">
                                                                            ${window.page.collection_barcode}
                                                                        </th>
                                                                        <th scope="col" class="p-3 font-semibold border-l dark:border-zink-50 border-gray-300">
                                                                            ${window.page.collection}
                                                                        </th>
                                                                        <th scope="col" class="p-3 font-semibold border-l dark:border-zink-50 border-gray-300">
                                                                            ${window.page.back}
                                                                        </th>
                                                                        <th scope="col" class="p-3 font-semibold border-l dark:border-zink-50 border-gray-300">
                                                                             ${window.page.kant}
                                                                        </th>
                                                                        
                                                                    </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr class="bg-white border border-gray-300 dark:border-zink-50 dark:bg-zink-700" id="collection_table_row_${target_count}">
                                                                   
                                                                </tr>
                                                                
                                                            </tbody>
                               
                                                        </table>

                                                </div>



                                           


                                                <div class="md:col-span-2"  style="display:none;" id="keepflow_div_${target_count}">
                                                        
                                                            <div>
                                                                <label for="keepflow" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.keep_flow}</label>
                                                                <div class="flex space-x-4">
                                                                    <input type="radio" id="keepflow_yes_${target_count}" data-id="${target_count}" name="keepflow[]"  class="hidden">
                                                                    <label for="keepflow_yes_${target_count}" class="text-gray-600 transition-all duration-300 ease-linear dark:bg-zink-50 dark:border-transparent border-gray-50 bg-gray-50 hover:bg-gray-600 hover:border-gray-600 hover:text-white active:bg-gray-600 active:border-gray-600 active:text-white focus:bg-gray-600 focus:ring focus:ring-gray-600/30 focus:border-gray-600 focus:text-white btn keep_flow_decision_btn" data-label="yes" data-id="${target_count}">${window.page.yes}</label>

                                                                    <input type="radio" id="keepflow_no_${target_count}" data-id="${target_count}" name="keepflow[]" value="0" class="hidden">
                                                                    <label for="keepflow_no" class="text-gray-600 transition-all duration-300 ease-linear dark:bg-zink-50 dark:border-transparent border-gray-50 bg-gray-50 hover:bg-gray-600 hover:border-gray-600 hover:text-white active:bg-gray-600 active:border-gray-600 active:text-white focus:bg-gray-600 focus:ring focus:ring-gray-600/30 focus:border-gray-600 focus:text-white btn keep_flow_decision_btn" data-label="no" data-id="${target_count}">${window.page.no}</label>
                                                                </div>
                                                            </div>
                                                        
                                                </div>


                                                <div id="keep_flow_tracker_step_${target_count}" style="display:none;" >
                                                    <input type="hidden" name="keepflow[]" class="keepflow_counter" id="keepflow_${target_count}" value="0">
                                                </div>

                                                <div class="md:col-span-2" style="display:none;" id="texture_div_${target_count}">
                                                        <div>
                                                            <label for="texture" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.texture}</label>
                                                            <select class="col-span-12 sm:col-span-10 px-3 bg-white w-full border p-2 border-gray-400 rounded placeholder:text-sm focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700  dark:bg-zink-700 dark:border-zink-50 dark:text-zink-200"  name="texture[]" required>
                                                               
                                                                <option value="${window.page.keep_flow_height}">${window.page.keep_flow_height}</option>
                                                                <option value="${window.page.keep_flow_width}">${window.page.keep_flow_width}</option>
                                                                
                                                            </select>
                                                        </div>
                                                </div>


                                                <div class=" md:col-span-4"  style="display:none;" id="upload_file_div_${target_count}">
                                                            <div>
                                                                <label for="upload_file" class="blink block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.uploadfile}</label>
                                                                <input class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-zink-50 dark:text-zink-200 dark:file:bg-zink-50 dark:file:text-zink-200 dark:focus:border-primary"  type="file" accept=".jpg, .jpeg, .png, .gif"  name="upload_file[]"  id="${target_count}" placeholder="${window.page.uploadfile}"/>
                                                                
                                                            </div>
                                                            <input type="hidden" name="upload_file_tracker[]" class="upload_file_tracker" id="upload_file_tracker_${target_count}" value="0">
                                                </div>`];
       
        

        let question_ = ` <div class="md:col-span-12" id="keepflow_question_${target_count}" style="display:none;">
                                                        
                                                                    <div class="custom-radio form-check form-check-inline">
                                                                        <label class="block font-medium text-gray-700 mb-2 dark:text-zink-200">${window.page.keepflow_question} </label>
                                                                       
                                                                         <input   data-id="${target_count}" class="w-3 h-3 text-blue-600 bg-gray-300 border border-gray-400 rounded-full appearance-none checked:bg-blue-500 checked:border-blue-500 dark:bg-transparent dark:border-zink-300" type="radio" name="keep_flow_question" value="no">
                                                                        <label class="text-gray-600 dark:text-zink-200 " for="customRadioInline2">${window.page.no}</label>
                                                                       
                                                                        <br/>
                                                                         <input  data-id="${target_count}"  class="w-3 h-3 mt-2 text-blue-600 bg-gray-300 border border-gray-400 rounded-full appearance-none checked:bg-blue-500 checked:border-blue-500 dark:bg-transparent dark:border-zink-300" type="radio" name="keep_flow_question" value="yes">
                                                                        <label class="text-gray-600 dark:text-zink-200" for="customRadioInline1">${window.page.yes}</label>
                                                                       
                                                                    </div>
                                                        
                                                </div>`;
        // if (decision == "yes")
            html_.push(question_+`<div class="md:col-span-6 knob_div_${target_count}" style="display:none">
                                                        <div>
                                                            <label for="knob_family" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.knob_family}</label>
                                                            <select class="use_select2 col-span-12 sm:col-span-10 px-3 bg-white w-full border p-2 border-gray-400 rounded placeholder:text-sm focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700  dark:bg-zink-700 dark:border-zink-50 dark:text-zink-200" data-id="${target_count}"  name="knob_family[]" required>
                                                                
                                                                
                                                                
                                                            </select>
                                                        </div>
                                                </div>

                                                <div class="md:col-span-6 knob_div_${target_count}" style="display:none">
                                                        <div>
                                                            <label for="knob_color" class="block font-medium text-gray-700 text-13 mb-2 dark:text-zink-200">${window.page.knob_color}</label>
                                                            <select class="use_select2 col-span-12 sm:col-span-10 px-3 bg-white w-full border p-2 border-gray-400 rounded placeholder:text-sm focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700  dark:bg-zink-700 dark:border-zink-50 dark:text-zink-200 knob_color_selection" data-record="${target_count}" data-id="${parseInt(target_count) - 2}" name="knob_color[]" required>
                                                                
                                                            </select>
                                                        </div>
                                                </div>`);
        return html_.join('');
    }






    $('input[name="color_selection"]').change(function() {
        var selectedValue = $("input[name='color_selection']:checked").val();
        // $("input[name='color_selection']").attr('disabled',true);
        $("#decision").val(selectedValue);
        $("#create_order_form_step_3").empty().append(html_fields_generation(selectedValue, 3));
        // $("#create_order_form_step_4").empty();
        // $("#create_order_form_step_5").empty();
        // $('#create_order_form_step_2').remove();
        // if (selectedValue == "yes")  // on yes choose this div will show up
        //     $("#create_order_form_add_collection_div").show();
        $("#create_order_form_step_3 select.use_select2").select2();
        // get_collection(handleCollectionData, 3, ["collection_barcode[]","collection[]"], ["collection_barcode","collection_name"]);
        // get_collection(handleCollectionData, 3, ["collection_barcode[]","collection[]"], ["collection_barcode","description"]);

        get_collection(handleCollectionData, 3, ["collection_barcode[]"], ["collection_barcode"]);


        // get_knob_family(handleKnobFamilyData, 3, ["knob_family[]","knob_color[]"], ["knob_family","knob_color"]);



        // get_knob_family(handleKnobFamilyData, 3, ["knob_family[]"], ["knob_family","knob_color"]);

        get_knob_family(handleKnobFamilyData, 3, ["knob_family[]"], ["knob_family"]);
        
    }); //end input[name="color_selection"] event here

    ///////////////// add event on collection barcode field and collection name both fields are dependent each other
        


    $(document).on('change','select[name="knob_color[]"]', function(){
        console.log('inside the select[name="knob_color[]"] change function___')
        let data_id = $(this).attr('data-record');
        let decision = $("#decision").val();
        
        let updates = {
            'knob_color':$(this).val()
        };
        knobs_tracker = updateKnobInfo(knobs_tracker, parseInt(data_id), updates);
        console.log("knobs_tracker=",knobs_tracker);
        // let add_collection_btn_count = $("#add_collection_btn").attr('data-id');
        if (decision === "yes")
            $("#create_order_form_add_collection_div").show();
    });


   // function updateKnobInfo(knobs_tracker, id_to_find,collection_barcode , new_knob_family, new_knob_color) {
   //   console.log(id_to_find, new_knob_family, new_knob_color);
   //      // Iterate through the list of objects
   //      for (let obj of knobs_tracker) {
   //          // Check if the id matches
   //          if (obj.id === id_to_find) {
   //              console.log("Matched");
   //              // Update the values if they are provided

   //              if (new_knob_family !== undefined) {
   //                  obj.knob_family = new_knob_family;
   //              }
   //              if (new_knob_color !== undefined) {
   //                  obj.knob_color = new_knob_color;
   //              }
   //              break; // Exit the loop once the object is found and updated
   //          }
   //      }
   //      return knobs_tracker;
   //  }
     function updateKnobInfo(knobs_tracker, id_to_find, updates) {
        // Iterate through the list of objects
        for (let obj of knobs_tracker) {
            // Check if the id matches
            if (obj.id === id_to_find) {
                // Update the values if they are provided in the updates object
                for (let key in updates) {
                    if (updates.hasOwnProperty(key)) {
                        obj[key] = updates[key];
                    }
                }
                break; // Exit the loop once the object is found and updated
            }
        }
        return knobs_tracker;
    }

    $(document).on('change','select[name="knob_family[]"]', function(){
        console.log('inside the select[name="knob_family[]"] change function___')
        let element_names = ["knob_color[]"];
        let keys = ["colorknob_description"];

        let data_id = $(this).attr('data-id');
        
        let selected_knob_family =  $(this).val();

        let updates = {
            'knob_family':selected_knob_family
        };
        knobs_tracker = updateKnobInfo(knobs_tracker, parseInt(data_id), updates);
        console.log("knobs_tracker=",knobs_tracker);
        let selected_color_flag  = $(this).find(':selected').attr('data-id');

        // let element_names = ["collection[]"];
        // let keys = ["description"];
        let elem_name = `div#create_order_form_step_${data_id} select[name='${element_names[0]}']`;
        var selectElement =  $(elem_name).empty();
        console.log("selected_knob_family=",selected_knob_family);
        console.log("selected_color_flag=",selected_color_flag);
         // let elem_name = `div#create_order_form_step_${step_number} select[name='${element_names[index]}']`;
        if (selected_color_flag == 0){
            
            selectElement.append($('<option>', {
                    value: '',
                    text: window.page.select_a_value
                    }
            ));

            selectElement.append($('<option>', {
                value: window.page.nature,
                text:  window.page.nature,
            }
            ));



        }else{
            $.ajax({
                    url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
                    method:'POST',
                    data:{
                        data_requirement:'knob_color', 
                    },
                    dataType:'JSON',
                    success:function(data){
                        let data__ = data.data;
                        // console.log("data__",data__);
                         selectElement.append($('<option>', {
                                    value: '',
                                    text: window.page.select_a_value
                                }
                            ));
                        $.each(data__, function (index, item) {
                            // console.log(item['colorknob_color'], selected_color_flag);
                                    // if (item['colorknob_color'] === selected_color_flag){
                                       
                                            selectElement.append($('<option>', {
                                                value: item[keys[0]],
                                                text: item[keys[0]]
                                            }
                                        ));
                                    // }//end if here
                        }); //end second each

                        // callback(data, step_number, element_names, keys);
                    } //end success here
            }); //end ajax call here
        }





    });

    function extra_fields(show_flag, data_id){
        if (show_flag === "Yes"){
            $(`div#create_order_form_step_${data_id} #keepflow_div_${data_id}`).show();
            $(`div#create_order_form_step_${data_id} #texture_div_${data_id}`).show();
            $(`div#create_order_form_step_${data_id} #upload_file_div_${data_id}`).show();
        }else{
             $(`div#create_order_form_step_${data_id} #keepflow_div_${data_id}`).hide();
            $(`div#create_order_form_step_${data_id} #texture_div_${data_id}`).hide();
            $(`div#create_order_form_step_${data_id} #upload_file_div_${data_id}`).hide();
        }
    }


    function getValuesForKey(key, list) {
        const values = [];
        list.forEach(obj => {
            const value = obj[key];
            if (value !== undefined) {
                values.push(value);
            }
        });
        return values;
    }


    $(document).on('change','.collection_barcode',function(){ //td
        // $(this).css('pointer-events','none');
        let collectionbarcode = $(this).find(':selected').text();
        let data_id  = $(this).attr('data-id');
        let knob_decision = getValuesForKey(collectionbarcode, knobs_tracker);
        console.log(knobs_tracker);
        console.log(knob_decision);
        if (knob_decision[0] ==  "no"){
            //$(`table#order_table .question_dependency_${data_id}`).remove();
            $(`table#order_table .question_dependency_${data_id}`).remove();
            // $(`table#order_table .question_dependency_${data_id}`)

            $(`table#order_table #ot_row_${data_id}`).append(`<input type="hidden" name="knob_model[]" value=''><input type="hidden" name="knob_position[]" value=''>`);
            
            $(`table#order_table #fourth_td_label_${data_id}`).remove();
            $(`table#order_table #fifth_td_label_${data_id}`).remove();
        }


    });
    


    $(document).on('change','.knob_model_td',function(){ //td
        let data_id  = $(this).attr('data-id');
        
        let decision = $("#decision").val();
        console.log(decision);
        console.log(knobs_tracker);
        if (decision == "no"){
            let collection_barcode = $("#collection_barcode_3").val();
            let knob_decision = getValuesForKey(collection_barcode, knobs_tracker);
            // console.log(knob_decision[0]);
            if (knob_decision[0] ==  "yes"){
                $(`#knob_position_${data_id}`).removeClass('hide_');
                $(`#fifth_td_label_${data_id}`).removeClass('hide_');
            }

        }else{
                $(`#knob_position_${data_id}`).removeClass('hide_');
                $(`#fifth_td_label_${data_id}`).removeClass('hide_');
            }
        // if ($(`#fifth_td_label_${data_id}`).length){
        //     console.log(decision, $(`#fifth_td_label_${data_id}`).length);
        //     $(`#fifth_td_label_${data_id}`).removeClass('hide_');
        // }

        // let value = $(this).find(":selected").val();
        // if (value == window.page.without_knob)
        // {
        //     $(`#knob_position_${data_id}`).empty().append('<option value=""></option>');
        //     $(`#knob_position_${data_id}`).addClass('hide_');
        // }
    });


    function deleteById(list, id_to_delete) {
        return list.filter(obj => obj.id !== id_to_delete);
    }

    function findById(list, id_to_find) {
        if (!Array.isArray(list)) {
            console.error("List is not an array.");
            return null;
        }

        const foundObj = list.find(obj => obj.id === id_to_find);
        return foundObj ? foundObj : null;
    }

    function findByIdAndRenameFirstKey(list, id_to_find, new_first_key) {
        const foundObj = list.find(obj => obj.id === id_to_find);
        if (foundObj) {
            const keys = Object.keys(foundObj);
            const firstKey = keys[0];
            foundObj[new_first_key] = foundObj[firstKey];
            delete foundObj[firstKey];
            return foundObj;

        } else {
            return null;
        }
    }



    $(document).on('change','select[name="collection_barcode[]"]', function(){
        let data_id = $(this).attr('data-id');
        let back =  $(this).find(":selected").data('back');
        let kant =  $(this).find(":selected").data('kant');
        $("input[name='color_selection']").attr('disabled',true);
        let collectionbarcode = $(this).val();
        if (findById(knobs_tracker, parseInt(data_id))){
            console.log("exists");
            
            // let result = findByIdAndRenameFirstKey(knobs_tracker, parseInt(data_id), collectionbarcode); 
            // const indexToRemove = knobs_tracker.findIndex(obj => obj.id === parseInt(data_id));
            
            // if (indexToRemove !== -1)
            //     knobs_tracker[indexToRemove] = result;

            // console.log("knobs_tracker at line 1123",knobs_tracker); 
            knobs_tracker = deleteById(knobs_tracker, parseInt(data_id));
            knobs_tracker.push(
                    {
                        [collectionbarcode]: '',
                        'id': parseInt(data_id),
                        'knob_family':'',
                        'knob_color':'',
                    }
            );

        }else{
             knobs_tracker.push(
                    {
                        [collectionbarcode]: '',
                        'id': parseInt(data_id),
                        'knob_family':'',
                        'knob_color':'',
                    }
            ); 
            // knobs_tracker.push(
        }


        // knobs_tracker = replaceFirstKey(knobs_tracker, data_id, collectionbarcode);
        console.log("knobs_tracker=",knobs_tracker);
        let collection = $(this).find(":selected").data('collection');
        let description = $(this).find(":selected").data('description');




        let row =`<td class="p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
           ${collectionbarcode}
        </td>
        <td class="p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
            ${description}
        </td>
        <td class="p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
            ${back}
        </td>
        <td class="p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
            ${kant}
        </td>
         `;
        $(`#collection_table_row_${data_id}`).empty().append(row);
        $(`#collection_table_${data_id}`).show();
        // $(`#keepflow_question_${data_id}`).show();


        // console.log("selected_collection_barcode=",selected_collection_barcode);
        let selected_flow_flag  = $(this).find(':selected').attr('data-flow');
        extra_fields(selected_flow_flag, data_id);

        $(`#keepflow_question_${data_id}`).show();

        
        // $.ajax({
        //         url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
        //         method:'POST',
        //         data:{
        //             data_requirement:'collection', 
        //         },
        //         dataType:'JSON',
        //         success:function(data){

        //             let elem_name = `div#create_order_form_step_${data_id} select[name='${element_names[0]}']`;
        //             var selectElement =  $(elem_name).empty();
        //             selectElement.append($('<option>', {
        //                     value: '',
        //                     text: window.page.select_a_value
        //                 }
        //             ));


        //             let data_ = data.data;
        //             for (let i=0; i< data_.length; i++){
        //                 if (data_[i].collection_barcode == selected_collection_barcode && data_[i].in_stock_bool == 1  ){ // check if it exists in stock or not
        //                     // console.log(i, "Matched");

        //                     selectElement.append($('<option>', {
        //                             value: data_[i][keys[0]],
        //                             text: data_[i][keys[0]],
        //                             'data-back':data_[i]['back'],
        //                             'data-kant':data_[i]['kant'],
        //                             'data-minorder':data_[i]['min_order'],
        //                             'data-collectionbarcode':selected_collection_barcode,
        //                             'data-flow':data_[i]['flow']

        //                         }
        //                     ));
        //                 }//end if here
        //             }//end for loop here
        //             // callback(data, step_number, element_names, keys);

        //         }
        // }); //end ajax call here        
        

    });

    // function checkIdExists(list, id_to_find) {
    //     return list.some(obj => obj.id === id_to_find);
    // }
     $(document).on('change','input[name="keep_flow_question"]',function() {

        var selectedValue = $(this).val();
        let data_id = $(this).attr('data-id');
        // knobs_tracker.push({
        //             [$(`#collection_barcode_${data_id}`).find(':selected').val()]: selectedValue,
        //             'id': parseInt(data_id),
        //             'knob_family':'',
        //             'knob_color':'',
        //             // 'knob_decision':'',

        // });
        let updates = {
            [$(`#collection_barcode_${data_id}`).find(':selected').val()]:selectedValue
        };
        if (selectedValue == "no"){
            updates = {
                        [$(`#collection_barcode_${data_id}`).find(':selected').val()]:selectedValue, 
                        'knob_family':'',
                        'knob_color':''

            };
        }
        
        knobs_tracker = updateKnobInfo(knobs_tracker, parseInt(data_id), updates);
        console.log("knobs_tracker=",knobs_tracker);

        // if (!checkIdExists(knobs_tracker, parseInt(data_id))){
            // console.log(`${data_id} does not exists in knobs_tracker`);
            // knobs_tracker.push(
            //     {
            //         [$(`#collection_barcode_${data_id}`).find(':selected').val()]: selectedValue,
            //         'id': parseInt(data_id),
            //         'knob_family':'',
            //         'knob_color':'',
            //         // 'knob_decision':'',

            //     }
            // );
        // }else
            // {
            //         console.log(`${data_id} is exists in knobs_tracker`);
            //     knobs_tracker = updateKnobInfo(knobs_tracker, parseInt(data_id),undefined, undefined,selectedValue);
            // }

        // console.log("knobs_tracker=",knobs_tracker);
        if (selectedValue == "yes"){
            $(`.knob_div_${data_id}`).show();
            $(".use_select2").select2();   
        }else{
            show_hide_order_table();
            $(`.knob_div_${data_id}`).remove();
        }

        let decision = $("#decision").val();
        if (decision === "yes")
            $("#create_order_form_add_collection_div").show();
        else
            $("#create_order_form_add_collection_div").hide();
        $('#keepflow_question_' + data_id).find('input[type="radio"]').removeAttr('name');
        $(`#keepflow_question_${data_id}`).css('pointer-events','none');
        
        // if (selectedValue =="yes")
        //show_hide_order_table();
    
    }); //end input[name="color_selection"] event here

    // $(document).on('change','select[name="collection[]"]', function(){
    //     // console.log("I am working");
    //     // let element_names = ["collection_barcode[]"];
    //     // let keys = ["collection_barcode"];
    //     let data_id = $(this).attr('data-id');
        
    //     $(`#keepflow_question_${data_id}`).show();
        

    //     let back =  $(this).find(":selected").data('back');
    //     let kant =  $(this).find(":selected").data('kant');
    //     let minorder =  $(this).find(":selected").data('minorder');
    //     let collectionbarcode =  $(this).find(":selected").data('collectionbarcode');
    //     // let description = $(this).find(":selected").val();

    //     // console.log(kant, back, minorder, collectionbarcode, description);
    //     let row =`<td class="p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
    //        ${collectionbarcode}
    //     </td>
    //     <td class="p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
    //         ${description}
    //     </td>
    //     <td class="p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
    //         ${back}
    //     </td>
    //     <td class="p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
    //         ${kant}
    //     </td>
    //      `;
    //     $(`#collection_table_row_${data_id}`).empty().append(row);
    //     $(`#collection_table_${data_id}`).show();
    //     // console.log("selected_collection=",selected_collection);
    //     // $.ajax({
    //     //         url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
    //     //         method:'POST',
    //     //         data:{
    //     //             data_requirement:'collection', 
    //     //         },
    //     //         dataType:'JSON',
    //     //         success:function(data){

    //     //             let elem_name = `div#create_order_form_step_${data_id} select[name='${element_names[0]}']`;
    //     //             var selectElement =  $(elem_name).empty();
    //     //             selectElement.append($('<option>', {
    //     //                     value: '',
    //     //                     text: window.page.select_a_value
    //     //                 }
    //     //             ));
    //     //             let data_ = data.data;
    //     //             for (let i=0; i< data_.length; i++){
    //     //                 if (data_[i].description == selected_collection && data_[i].in_stock_bool == 1){ // check if it exists in stock or not
    //     //                     console.log(i, "Matched");
    //     //                     selectElement.append($('<option>', {
    //     //                             value: data_[i][keys[0]],
    //     //                             text: data_[i][keys[0]]
    //     //                         }
    //     //                     ));
    //     //                 }//end if here
    //     //             }//end for loop here
    //     //             // callback(data, step_number, element_names, keys);

    //     //         }
    //     // }); //end ajax call here    
        

        
    // });

    ///////////// end event on collection barcode field and collection name both fields are dependent each other




    $(document).on('click','#add_collection_btn',function(){
        $("#create_order_form_add_collection_div").hide();
        let next_count_div = $(this).attr('data-id');
        // console.log(next_count_div);
            
        $("#step_click_counter").val(parseInt($("#step_click_counter").val()) + 1);

        let decision = $("#decision").val();
        $(`#create_order_form_step_${next_count_div}`).empty().append(html_fields_generation(decision, next_count_div));
        
        //get_collection(handleCollectionData, next_count_div, ["collection_barcode[]","collection[]"], ["collection_barcode","description"]);
        //console.log("Collection data is populated");
        /////////// start map logic for the collections which are already exists
        let keys = ["collection_barcode"];
        let element_names = ["collection_barcode[]"];
        let selected_collection = [];
        $(`select[name='collection_barcode[]']`).each(function() {
            let value = $(this).val();
            if (value !== null && value.length > 0)
                selected_collection.push(value);
        }); 

        // console.log("selected_collections are=",selected_collection); 
        let step_number = next_count_div;
         $.ajax({
                url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
                method:'POST',
                data:{
                    data_requirement:'collection', 
                },
                dataType:'JSON',
                success:function(data){
                        $.each(keys, function(index,key){
                                // console.log(index, key);
                        let elem_name = `div#create_order_form_step_${step_number} select[name='${element_names[index]}']`;
                        // console.log(elem_name);
                        var selectElement =  $(elem_name).empty();
                        selectElement.append($('<option>', {
                                value: '',
                                text: window.page.select_a_value
                            }
                        ));

                        if (selectElement){
                                        $.each(data.data, function (index, item) {
                                            
                                            if (!selected_collection.includes(item[key])){
                                                    if (item.in_stock_bool == 1){
                                                        selectElement.append($('<option>', {
                                                                value: item[key],
                                                                text: item[key],
                                                                'data-flow':item['flow'],
                                                                'data-id':item['collection_id'],
                                                                'data-back':item['back'],
                                                                'data-kant':item['kant'],
                                                                'data-minorder':item['min_order'],
                                                                'data-collection':item['collection_name'],
                                                                'data-description':item['description'],


                                                            }
                                                         ));
                                                    }
                                            }


                                    }); //end second each
                                }
                        }); // end  each loop

                } //end success here
        }); //end ajax call here

        // let all_collection_barcodes = []; // Initialize an empty array to store the values
        // setTimeout(function(){
        //         $("select[name='collection_barcode[]']").each(function() {
        //             let value = $(this).val();
        //             if (value !== null && value.length > 0){
        //                 console.log("value",value);
        //                 $(`select#collection_barcode_${next_count_div} option[value='${value}']`).hide();
                        
        //                 // all_collection_barcodes.push($(this).val());
        //             }
        //         });    
        // },1);



        
       
        /////////// end map logic for the collections which are already exists


        
        $(`#create_order_form_step_${next_count_div} select.use_select2`).select2();

        // get_knob_family(handleKnobFamilyData, next_count_div, ["knob_family[]","knob_color[]"], ["knob_family","knob_color"]);
        get_knob_family(handleKnobFamilyData, next_count_div, ["knob_family[]"], ["knob_family"]);
        $('table#order_table tbody td:first-child').removeClass('hide_');
        $('table#order_table thead th:first-child').removeClass('hide_');
        // for (let i=0; i< $('table#order_table tbody tr').length;i++ )
        //     get_collection_data(populateRowData_Collection, i+1);

        let counter = parseInt(next_count_div)+1;

        $("#add_collection_btn").attr('data-id',counter);
        if (counter > 5)
            $("#create_order_form_add_collection_div").hide();
        // $().empty().append();
    });






    // $(', create_order_form_step_3#knob_color').on('change', function() {
    //         // Get the selected values
    //         var knobFamilyValue = $('#knob_family').val();
    //         var knobColorValue = $('#knob_color').val();

    //         // Check if both selections are made
    //         if (knobFamilyValue !== '' && knobColorValue !== '') {
                
    //         }
    // });


    




    function generate_row(tr_count){
            let class_name = "hide_";
            let counter = parseInt ($("#add_collection_btn").data('id'));
            if (counter > 4)
                class_name = "";
            
            let options = `<option value="" disabled selected>${window.page.select_a_value}</option>`;
            $(`select[name='collection_barcode[]']`).each(function() {
                let value = $(this).val();
                let id = $(this).find(':selected').attr('data-id');
                if (value !== null && value.length > 0)
                    options+=`<option value="${id}">${value}</option>`;
            }); 

            return  `<tr id="ot_row_${tr_count}" class="bg-white border border-gray-300 dark:border-zink-50 dark:bg-zink-700">

                        <td id="zero_td_${tr_count}" scope="row" class="p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300 ${class_name}" >
                            <select class="col-span-12 sm:col-span-10 px-3 bg-white w-full border p-2 border-gray-400 rounded placeholder:text-sm focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700  dark:bg-zink-700 dark:border-zink-50 dark:text-zink-200 collection_barcode" name="collection_barcode_td[]" id="collection_barcode_td_${tr_count}" data-id="${tr_count}">
                                    ${options}
                            </select>
                            <div class="" id="zero_td_label_${tr_count}"></div>
                        </td>



                        <td scope="row" class="p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300" id="first_td_${tr_count}">
                            


                            <input type="text" name="height[]" id="height_${tr_count}" class=" w-full border py-1 p-2 placeholder:text-gray-600 rounded border-gray-400 placeholder:text-[11px] focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent dark:border-zink-50 dark:placeholder:text-zink-200" data-id="${tr_count}" required>
                            

                            <div class="" id="first_td_label_${tr_count}"></div>


                        </td>
                        <td class="p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
                            <input type="text" name="width[]" id="width_${tr_count}" class=" w-full border py-1 p-2 placeholder:text-gray-600 rounded border-gray-400 placeholder:text-[11px] focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent dark:border-zink-50 dark:placeholder:text-zink-200" data-id="${tr_count}" required>
                            <div class="" id="second_td_label_${tr_count}"></div>
                        </td>
                        <td class= "p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
                            <input type="text" name="quantity[]" id="quantity_${tr_count}" class="w-full border py-1 p-2 placeholder:text-gray-600 rounded border-gray-400 placeholder:text-[11px] focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700 dark:bg-transparent dark:border-zink-50 dark:placeholder:text-zink-200" data-id="${tr_count}" required>
                            <div class="" id="third_td_label_${tr_count}"></div>
                        </td>
                        <td class=" p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
                            <select class="question_dependency_${tr_count} col-span-12 sm:col-span-10 px-3 bg-white w-full border p-2 border-gray-400 rounded placeholder:text-sm focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700  dark:bg-zink-700 dark:border-zink-50 dark:text-zink-200 knob_model_td" name="knob_model[]" id="knob_model_${tr_count}" data-id="${tr_count}" required>

                            </select>
                            <div class="" id="fourth_td_label_${tr_count}"></div>
                        </td>

                        <td class=" p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
                            <select class="question_dependency_${tr_count} col-span-12 sm:col-span-10 px-3 bg-white w-full border p-2 border-gray-400 rounded placeholder:text-sm focus:border focus:border-gray-400 focus:ring-0 focus:outline-none text-gray-700  dark:bg-zink-700 dark:border-zink-50 dark:text-zink-200 hide_" name="knob_position[]" id="knob_position_${tr_count}" data-id="${tr_count}" required>
                            </select>
                            <div class="hide_" id="fifth_td_label_${tr_count}"></div>
                        </td>

                        <td class="text-center p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
                            <button type="button" data-id="drills_${tr_count}" id="plus_hinge_btn_${tr_count}" class="subform_btn">
                            <i class="fa fa-plus"></i></button>
                            ${subform_generation(tr_count)}
                        </td>

                        <td class="text-center p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
                            <button type="button" data-id="drills_${tr_count}_notes" id="plus_notes_${tr_count}" class="subform_btn" ><i class="fa fa-plus"></i></button>
                            ${notes_form_generation(tr_count)}
                        </td>


                        <td class="text-center p-3 text-gray-700 font-normal whitespace-nowrap dark:text-zink-200 border-l dark:border-zink-50 border-gray-300">
                            <button class="delete_btn" type="button" name="delete_button[]" data-id="${tr_count}"><i class="fa fa-trash"></i></button>
                        </td>
                    </tr>`;
    } //end generate_row here




    function count_quantity(){
            var totalQuantity = 0;
    
            // Iterate over each input element with name "quantity[]"
            $('input[name="quantity[]"]').each(function() {
                // Convert input value to a number and add it to totalQuantity
                totalQuantity += parseInt($(this).val()) || 0;
            });

            return totalQuantity;

          //  $("#quatity_counter").html(totalQuantity);

    }

    $(document).on('keyup','input[name="quantity[]"]', function(){
            // var totalQuantity = 0;
            // // Iterate over each input element with name "quantity[]"
            // $('input[name="quantity[]"]').each(function() {
            //     // Convert input value to a number and add it to totalQuantity
            //     totalQuantity += parseInt($(this).val()) || 0;
            // });

            $("#quatity_counter").html(count_quantity());
    });

    function get_knob_position(callback, row_count){
        $.ajax({
                url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
                method:'POST',
                data:{
                    data_requirement:'knob_position', 
                },
                dataType:'JSON',
                success:function(data){
                    callback(data, row_count);
                }
        }); //end ajax call here
       
    } //end get_knob_position func here

    function get_door_opening_sides(callback, row_count){
        $.ajax({
                url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
                method:'POST',
                data:{
                    data_requirement:'door_opening_side', 
                },
                dataType:'JSON',
                success:function(data){
                    callback(data, row_count);
                }
        }); //end ajax call here
       
    } //end get_knob_position func here


    function get_claps_pr_provider(callback, row_count){
        $.ajax({
                url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
                method:'POST',
                data:{
                    data_requirement:'claps_pr_order', 
                },
                dataType:'JSON',
                success:function(data){
                    callback(data, row_count);
                }
        }); //end ajax call here
       
    } //end get_knob_position func here

     function get_hinge_provider(callback, row_count){
        $.ajax({
                url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
                method:'POST',
                data:{
                    data_requirement:'hinge_provider', 
                },
                dataType:'JSON',
                success:function(data){
                    callback(data, row_count);
                }
        }); //end ajax call here
       
    } //end get_knob_position func here

    function get_drawer_data(callback, row_count){
        $.ajax({
                url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
                method:'POST',
                data:{
                    data_requirement:'drawer', 
                },
                dataType:'JSON',
                success:function(data){
                    callback(data, row_count);
                }
        }); //end ajax call here
       
    } //end get_drawer_data func here

    function get_collection_data(callback, row_count){
        $.ajax({
                url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
                method:'POST',
                data:{
                    data_requirement:'collection', 
                },
                dataType:'JSON',
                success:function(data){
                    callback(data, row_count);
                }
        }); //end ajax call here
       
    } //end get_collection func here


    
    function mapping_knob_models(response, selectElement){

        var opt = $("<option>").text(window.page.without_knob).val(window.page.without_knob);
        opt.attr('selected', 'selected');
        opt.appendTo(selectElement);
        // console.log("response at line 1716",response.data);
        if (response.data.length != 0){
            $.each(response.data, function(label, options) {
                    // Create an <optgroup> element
                    
                    if (options.length>0){

                        var optgroup = $("<optgroup>").attr("label", label);
                        // Loop through the options for the current label
                        $.each(options, function(index, option) {
                            // console.log("option",option);
                            // Create an <option> element and append it to the optgroup
                            $("<option>").text(option).val(option).appendTo(optgroup);
                        });
                        
                        // Append the optgroup to the select element
                        optgroup.appendTo(selectElement);
                }
            });
        }
            // selectElement.select2();
    } //edn mapping_knob_models here

    // specific_knob_family


    function specific_knob_family(row_count){


            let all_families = []; // Initialize an empty array to store the values
            $("select[name='knob_family[]']").each(function() {
                // Get the value of the current select element and push it into the array
                all_families.push($(this).val());
            });
            console.log("all_families=",all_families);

            $.ajax({
                    url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
                    method:'POST',
                    data:{
                        data_requirement:'specific_knob_family', 
                        knob_family:all_families
                    },
                    dataType:'JSON',
                    success:function(data){
                        // console.log(data);
                        mapping_knob_models(data, $(`#knob_model_${row_count}`).empty());
                        // callback(data, row_count);
                    }
            }); //end ajax call here
       
    } //end specific_knob_family func here
    

    // for row data rendering
    function populateRowData_KnobFamily(KnobFamilyData, row_count){
        
        var target_elems = [`knob_model_${row_count}`]

        $.each(KnobFamilyData.data, function (index, item) {
                                
                $(`#${target_elems[0]}`).append($('<option>', {
                                        text: item.knob_model,
                                        value: item.knob_id
                    }
                ));
        }); //end second each
    } //ends populateRowData_KnobFamily here








    function populateRowData_KnobPosition(KnobPositionData, row_count){
        var target_elems = [`knob_position_${row_count}`];
        // let data = KnobPositionData.data.sort((a, b) => a.helper_table_id - b.helper_table_id);
        const customOrder = [6, 7, 8, 4, 5];

        // Sorting the data based on the custom order
        let data = KnobPositionData.data.sort((a, b) => customOrder.indexOf(a.helper_table_id) - customOrder.indexOf(b.helper_table_id));

        $.each(data, function (index, item) {
            $(`#${target_elems[0]}`).append($('<option>', {
                        text: item.helper_value_hebrew,
                        value: item.helper_table_id
                    }
            ));
        }); //end second each

    } //end populateRowData_KnobPosition here


     function populateRowData_DoorSides(DoorSidesData, row_count){
        
        var target_elems = [`door_operning_side_${row_count}`];

        $.each(DoorSidesData.data, function (index, item) {
                                
                $(`#${target_elems[0]}`).append($('<option>', {
                        text: item.helper_value_hebrew,
                        value: item.helper_value_hebrew
                    }
                ));
        }); //end second each
    } //ends DoorSidesData here


    function populateRowData_HingeProvider(DoorSidesData, row_count){
        
        var target_elems = [`hinge_provider_${row_count}`];

        $.each(DoorSidesData.data, function (index, item) {
                                
                $(`#${target_elems[0]}`).append($('<option>', {
                        text: item.helper_value_hebrew,
                        value: item.helper_value_hebrew
                    }
                ));
        }); //end second each
    } //ends populateRowData_HingeProvider here


    function populateRowData_Collection(CollectionData, row_count){
        
        var target_elems = [`collection_barcode_td_${row_count}`];
        $(`#${target_elems[0]}`).empty();
        $.each(CollectionData.data, function (index, item) {
                                
                $(`#${target_elems[0]}`).append($('<option>', {
                        text: item.collection_barcode,
                        value: item.collection_id
                    }
                ));
        }); //end second each
    } //ends populateRowData_HingeProvider here
    

    // get_collection_data


     function populateRowData_clap_pr_provider(ClapPrOrderData, row_count){
        
        var target_elems = [`clap_pr_${row_count}`];

        $.each(ClapPrOrderData.data, function (index, item) {
                                
                $(`#${target_elems[0]}`).append($('<option>', {
                        text: item.helper_value_english,
                        value: item.helper_value_english
                    }
                ));
        }); //end second each
    } //ends populateRowData_HingeProvider here

    function populateRowData_DrawarData(Data, row_count){
        
        var target_elems = [`drawers_type_${row_count}`,`drawers_code_${row_count}`];
            
            $(`#${target_elems[0]}`).append($('<option>', {
                text: window.page.select_a_value,
                value: '', // Set value to empty if not needed
                disabled: true, // Make it disabled if needed
                selected: true // Make it selected by default
            }));

            $(`#${target_elems[1]}`).append($('<option>', {
                text: window.page.select_a_value,
                value: '', // Set value to empty if not needed
                disabled: true, // Make it disabled if needed
                selected: true // Make it selected by default
            }));



        $.each(Data.data, function (index, item) {
                                
                $(`#${target_elems[0]}`).append($('<option>', {
                        text: item.drawer_type,
                        value: item.drawer_type,
                        // 'data-drawercode':item.drawer_code,
                    }
                ));



                $(`#${target_elems[1]}`).append($('<option>', {
                        text: item.drawer_code,
                        value: item.drawer_code,
                        // 'data-drawertype':item.drawer_type,
                    }
                ));

        }); //end second each

    } //end populateRowData_DrawarData func  here

    // append first row
    
    // new mapping based on drawers_type
    $('#order_table_tbody').on('change','select[name="drawers_type"]',function(){
        let drawer_type = $(this).find(":selected").val();
        let element_id = $(this).attr('id').replace('type','code');
        $.ajax({
                url:$("#link_to_grab_order_page_data_").val(), // add url for posting request
                method:'POST',
                data:{
                    data_requirement:'get_specific_drawer_codes', 
                    drawer_type:drawer_type
                },
                dataType:'JSON',
                success:function(data){

                    $(`select#${element_id}`).empty().append($('<option>', {
                            text: window.page.select_a_value,
                            value: '', // Set value to empty if not needed
                            disabled: true, // Make it disabled if needed
                            selected: true // Make it selected by default
                        }));
                    

                    $.each(data.data, function (index, item) {
                        $(`select#${element_id}`).append($('<option>', {
                            text: item.drawer_code,
                            value: item.drawer_code,   
                               
                         }));

                   });
                }//end success here
        }); //end ajax call here
    }); //end select[name="drawers_type"] event here
    


    function show_hide_order_table(){
        let step_click_counter = parseInt($("#step_click_counter").val());
        let decision = $("#decision").val();
        let counter = parseInt ($("#add_collection_btn").attr('data-id'));

        console.log ("counter", counter);
        console.log ("step_click_counter", step_click_counter);
        console.log ("decision", decision);
        if (decision === "no"){

                        $("table#order_table tbody#order_table_tbody").empty().append(generate_row(1));
                        get_knob_family(populateRowData_KnobFamily, 1);
                        // if (knobs_tracker[0]['knob_color'] != "")
                        specific_knob_family(1);
                        get_knob_position(populateRowData_KnobPosition, 1);
                        get_door_opening_sides(populateRowData_DoorSides, 1);
                        get_hinge_provider(populateRowData_HingeProvider, 1);
                        get_claps_pr_provider(populateRowData_clap_pr_provider, 1);

                        get_drawer_data(populateRowData_DrawarData, 1);
                        $("#create_order_form_step_6").show();
                        $("#send_order_btn").removeClass('hide_');
                        $("#send_order_data_to_draft").removeClass('hide_');
                        $("#preview_order_button").removeClass('hide_');

                        
                
        }else{
                if (counter >= 5 && step_click_counter >=2){
                        // console.log("step_click_counter",step_click_counter);

                            $("table#order_table tbody#order_table_tbody").empty().append(generate_row(1));
                            // get_collection_data(populateRowData_Collection, 1);
                            get_knob_family(populateRowData_KnobFamily, 1);
                            specific_knob_family(1);

                            get_knob_position(populateRowData_KnobPosition, 1);
                            get_door_opening_sides(populateRowData_DoorSides, 1);
                            get_hinge_provider(populateRowData_HingeProvider, 1);
                            get_claps_pr_provider(populateRowData_clap_pr_provider, 1);
                            get_drawer_data(populateRowData_DrawarData, 1);
                            $('table#order_table tbody td:first-child').removeClass('hide_');
                            $('table#order_table thead th:first-child').removeClass('hide_');
                            $("#create_order_form_step_6").show();
                            $("#send_order_btn").removeClass('hide_');
                             $("#send_order_data_to_draft").removeClass('hide_');
                            $("#preview_order_button").removeClass('hide_');
                        // }
                    }else{
                        $('table#order_table tbody td:first-child').addClass('hide_');
                        $('table#order_table thead th:first-child').addClass('hide_');
                    } 
        }
        if (parseInt($("#add_collection_btn").attr('data-id'))==6){
            $("#add_collection_btn").hide();
        }
    } // end show_hide_order_table function here

    $(document).on('change','.knob_color_selection', function(e){
       

        let add_another_collection_count = parseInt($(this).attr('data-id'));
        let step_click_counter = parseInt($("#step_click_counter").val());
        let decision = $("#decision").val();
        console.log("Step=", add_another_collection_count);
        console.log("step_click_counter=", step_click_counter);
        let mapper_counter = add_another_collection_count + 2;
        if (add_another_collection_count  === step_click_counter){
                e.preventDefault(); 
                let val = $(this).val();
                let val2 = $(`#create_order_form_step_${mapper_counter} select[name="knob_family[]"]`).val();
                if (val != '' && val2 != ''){
                    
                    if (decision === "no"){

                        $("table#order_table tbody#order_table_tbody").empty().append(generate_row(1));
                        get_knob_family(populateRowData_KnobFamily, 1);
                        specific_knob_family(1);

                        get_knob_position(populateRowData_KnobPosition, 1);
                        get_door_opening_sides(populateRowData_DoorSides, 1);
                        get_hinge_provider(populateRowData_HingeProvider, 1);
                        get_claps_pr_provider(populateRowData_clap_pr_provider, 1);

                        get_drawer_data(populateRowData_DrawarData, 1);
                        $("#create_order_form_step_6").show();
                        $("#send_order_btn").removeClass('hide_');
                         $("#send_order_data_to_draft").removeClass('hide_');
                        $("#preview_order_button").removeClass('hide_');
                    }
                    let counter = parseInt ($("#add_collection_btn").data('id'));
                    
                    if (decision === "yes" && counter >= 4 && step_click_counter >=2){
                        // console.log("step_click_counter",step_click_counter);

                            $("table#order_table tbody#order_table_tbody").empty().append(generate_row(1));
                            // get_collection_data(populateRowData_Collection, 1);
                            get_knob_family(populateRowData_KnobFamily, 1);
                            specific_knob_family(1);

                            get_knob_position(populateRowData_KnobPosition, 1);
                            get_door_opening_sides(populateRowData_DoorSides, 1);
                            get_hinge_provider(populateRowData_HingeProvider, 1);
                            get_claps_pr_provider(populateRowData_clap_pr_provider, 1);
                            get_drawer_data(populateRowData_DrawarData, 1);
                            $('table#order_table tbody td:first-child').removeClass('hide_');
                            $('table#order_table thead th:first-child').removeClass('hide_');
                            $("#create_order_form_step_6").show();
                            $("#send_order_btn").removeClass('hide_');
                             $("#send_order_data_to_draft").removeClass('hide_');
                            $("#preview_order_button").removeClass('hide_');
                        // }
                    }else{
                        $('table#order_table tbody td:first-child').addClass('hide_');
                        $('table#order_table thead th:first-child').addClass('hide_');
                    }   
                }
                else 
                    $("#create_order_form_step_6").hide();
        }
            return false;
    });


    function extract_number(str){
        return parseInt(str.replace(/\D/g, ''), 10);
    }

    //plus_hinge_btn_$

    $(document).on('click','.subform_btn',function(){
        let id_ = $(this).data('id');
        $(`#${id_}`).addClass('show-modal');
        $(`#${id_}`).removeClass('hide-modal');
        $(`#entry_selector_${extract_number(id_)}`).removeClass('hide_');
        $("#active_pop_up_id").val(extract_number(id_)); // a hidden field which will count the current opened pop up id
    });

    $(document).on('click','.close_modal',function(){
        let id_ = $(this).data('id');
        $(`#${id_}`).removeClass('show-modal');
        $(`#${id_}`).addClass('hide-modal');
        $("#active_pop_up_id").val(''); // a hidden field which will count the current opened pop up id
    });


   function labels_mapper(row_count_){
        console.log("row_count_",row_count_);
        let alphabets = ["zero","first","second","third","fourth","fifth"];
        let inputs = ["collection_barcode_td","height","width","quantity","knob_model","knob_position"];
        if ($("tbody#order_table_tbody tr").length == 1){
            console.log("I cant display label for copying the above row");
        }else{
                for (let i =0; i < alphabets.length; i++){
                    $(`#${alphabets[i]}_td_label_${row_count_ - 1}`).empty();
                    let label = `<label for="remember" class="text-sm text-gray-600"><button type="button" title="${window.page.click_here_to_duplicate}" data-id="${row_count_}" class="duplicate_class_link text-dark-600 hover:underline" data-label="${inputs[i]}"><i class="!block text-[12px] hover:text-dark-500 transition ease-in-out duration-300  bx bx-copy"></i></button><div></div></label>`;
                    $(`#${alphabets[i]}_td_label_${row_count_}`).empty().append(label);
                } //end for loop here
        }
   } //end labels_mapper function here


   // function areAllFieldsFilled(inputSelectors) {
   //      for (const selector of inputSelectors) {
   //          if ($(selector).val() === '') {
   //              return false;
   //          }
   //      }
   //      return true;
   //  } //end areAllFieldsFilled func here

    function findMissingFields(inputSelectors) {
            let missingFields = [];
            for (const selector of inputSelectors) {
                if ($(selector).val() === '') {
                    missingFields.push(selector);
                }
            }
            return missingFields;
    }


    $('#create_order_form_step_7').on('click', '#add_row_btn', function () {
        let next_row_count = $("tbody#order_table_tbody tr").length;
        console.log("next_row_count=",next_row_count);

        // check validations on inputs feeds by user in first row

        //let inputs = ["input[name='width[]']","input[name='height[]']","input[name='quantity[]']"];
        let inputs = [`#width_${next_row_count}`,`#height_${next_row_count}`, `#quantity_${next_row_count}`];
        let inputs2 = ["width[]","height[]","quantity[]"];
        let mappper_ = [window.page.width_required,window.page.height_required,window.page.quantity_required];
        const missingFields = findMissingFields(inputs);
        // console.log(missingFields);
        if (missingFields.length > 0) {
            $("#error_fields").empty();
            for (const field of missingFields) {
                console.log($(field).attr('name'));
                let error_=`<div class="mb-5 px-5 py-3 text-red-800 bg-red-100 border border-red-200 rounded-md dark:border-red-500/20 dark:text-red-200 dark:bg-red-500/20">${mappper_[inputs2.indexOf($(field).attr('name'))]}</div>`;
                $("#error_fields").append(error_);
                
            }
            $("#error_fields").removeClass('hide_');
        }
        else{
                $("#error_fields").addClass('hide_');
                $("#quatity_counter").html(count_quantity());
                var row_count_ = $("tbody#order_table_tbody tr").length + 1;
                $("table#order_table tbody#order_table_tbody").append(generate_row(row_count_));
                labels_mapper(row_count_);
                // get_knob_family(populateRowData_KnobFamily, row_count_);
                specific_knob_family(row_count_);
                get_knob_position(populateRowData_KnobPosition, row_count_);
                get_door_opening_sides(populateRowData_DoorSides, row_count_);
                get_hinge_provider(populateRowData_HingeProvider, row_count_);
                get_claps_pr_provider(populateRowData_clap_pr_provider, row_count_);
                get_drawer_data(populateRowData_DrawarData, row_count_);
                let decision = $("#decision").val();
                let counter = parseInt ($("#add_collection_btn").attr('data-id'));
                console.log(decision, counter);
                if (decision === "yes" && counter >= 4){
                    $('table#order_table tbody td:first-child').removeClass('hide_');
                    $('table#order_table thead th:first-child').removeClass('hide_');
                    // console.log("I am working");
                    // get_collection_data(populateRowData_Collection, row_count_);
                }
        
        }

        // else{

        //         Swal.fire(
        //             {
        //                 title:window.page.error,
        //                 // text: 'Some fields are still empty', 
        //                 text: window.page.step_1_details_msg_warning,
        //                 icon: 'warning',
        //                 showConfirmButton: false,
        //                 timer: 2000
        //             }
        //         );
            
        // }
    
    });// end #add_row_btn event



    // Function to remove objects based on partial key match
    function removeObjectsByPartialKey(array, partialKey) {
        return array.filter(obj => {
            for (const key in obj) {
                if (key.startsWith(partialKey)) {
                    return false; // Exclude this object
                }
            }
            return true; // Include this object
        });
    } //end removeObjectsByPartialKey here
  


    $('#order_table_tbody').on('click', '.delete_btn', function (e) {
        let row_to_delete_id = $(this).data('id');

        $(`table#order_table tbody#order_table_tbody tr#ot_row_${row_to_delete_id}`).remove();
        var row_count_ = $("tbody#order_table_tbody tr").length + 1;
        labels_mapper(row_count_);
        cards = removeObjectsByPartialKey(cards, `row_${row_to_delete_id}`);
        console.log("Remaining Cards:", cards);
    });// end .delete_btn event

   
    function deserializeFormData(formDataString) {
            var formData = {};
            formDataString.split('&').forEach(function (pair) {
                var keyValue = pair.split('=');
                formData[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1] || '');
            });
            return formData;
    } //end deserializeFormData here

    function updateOrAppendObjectByKey(array, keyToReplace, newObject) {
            var indexToUpdate = array.findIndex(function(obj) {
                return Object.keys(obj)[0] === keyToReplace;
            });

            if (indexToUpdate !== -1) {
                // If the key exists, replace the existing object with the new one
                array.splice(indexToUpdate, 1, newObject);
            } else {
                // If the key doesn't exist, simply push the new object to the array
                array.push(newObject);
            }

            return array;
    } //end updateOrAppendObjectByKey here

    //////////////////////////////////////// Sub form submission
    // for tracking saved data of forms
    $('#order_table_tbody').on('submit', '.subform_temp', function (e) {
        e.preventDefault();
        let form_id = $(this).attr('id');
        let data =  deserializeFormData($(this).serialize());
        let key = `row_${extract_number(form_id)}_${data.subform_type}`;
        var myObject = {
            [key]: data
        };
        cards = updateOrAppendObjectByKey(cards, key, myObject);
        let success_msg = '';
        if (data.subform_type ==  "drawer")
            success_msg = window.page.drawer_success_msg;
        else if (data.subform_type ==  "claps")
            success_msg = window.page.claps_success_msg;
        else if (data.subform_type ==  "hinge")
            success_msg = window.page.hinge_success_msg;
        
        let icon_class=`bx bx-check-shield`;

        let btn_class  = `subform_temp subform_btn text-white transition-all duration-300 ease-linear bg-green-500 border-green-500 rounded-full hover:bg-green-600 hover:border-green-600 hover:text-white active:bg-green-600 active:border-green-600 active:text-white focus:bg-green-600 focus:border-green-600 focus:text-white focus:ring focus:ring-green-500/30 btn`;
        
        if (data.subform_type != "notes"){
            $(`#plus_hinge_btn_${extract_number(form_id)}`).attr('class', btn_class).css('font-size','20px');
            $(`#plus_hinge_btn_${extract_number(form_id)}`).empty().append(`<i class="${icon_class}"></i>`);
        }

        Swal.fire(
            {
                title: window.page.data_saved_msg,
                text: `${success_msg}`,
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            }
        );
        // console.log(cards);
        $('.close_modal').click();

        console.log("Closing the modal");
        return false;
    });


    $('#order_table_tbody').on('click', '.duplicate_class_link', function (e) {
        e.preventDefault();
        let row_id = $(this).data('id');
        let label = $(this).data('label');
        var prev_row_id = extract_number ( $(`#ot_row_${row_id}`).prev('tr').attr('id'));
        // console.log("prev_row_id=",prev_row_id);
        $(`#${label}_${row_id}`).val($(`#${label}_${prev_row_id}`).val());
        if (label == "knob_model"){
            // let last_td_val = $(`#knob_position_${prev_row_id}`).val();
            if ($(`#${label}_${prev_row_id}`).val() != window.page.without_knob){
                $(`#knob_position_${row_id}`).removeClass('hide_');
                $(`#fifth_td_label_${row_id}`).removeClass('hide_');
            }
        }
        $("#quatity_counter").html(count_quantity());
        return false;
    });


    // this function will used for saving order as draft after some time
    function save_to_draft(){
        console.info("Inside save_to_draft() function");
        var form_data = new FormData(document.getElementById('create_order_form'));
        form_data.append('cards', JSON.stringify(cards));
        
        form_data.append('client_order_name', $("#client_order_name").val());
        form_data.append('step','step_draft');
        //form_data.append('step','step_insert');
        form_data.append('knobs_tracker', JSON.stringify(knobs_tracker));
        form_data.append('keep_flow_tracker', JSON.stringify(keep_flow_tracker));
        console.log(form_data);
        $.ajax({
                url:$("#link_to_add_").val(), // add url for posting request
                method:'POST',
                data:form_data,
                processData: false,  
                contentType: false, 
                dataType: 'JSON',
                success:function(data){
                    console.log(data);
                }, //end success here
                error: function(data){
                    console.log(data);
                }
        }); //end ajax call here
    
    } //end save_to_draft function here


    $(document).on('click','#send_order_data_to_draft', function(){
        save_to_draft();
        console.log("Order data has been stored to Draft");
        Swal.fire(
                                        {
                                            title: window.page.good_job_title, 
                                            text: $("#draft_text").val(),
                                            icon: 'success',
                                            showConfirmButton: false,
                                            timer: 5000
                                        }
                                );
    });


    // Listen for visibility change events
    // $(document).on('visibilitychange', function() {
    //     // Update the tabFocused variable when visibility changes
    //     var tabFocused = document.visibilityState === 'visible';
    //     if (!tabFocused){
    //         console.log('I am not active:', tabFocused);
    //         var isReadOnly = $("#client_order_name").prop("readonly"); // to check this form is already in draft or not
    //         if (isReadOnly){
    //             save_to_draft();
    //             // need to set from here


    //         }else{
    //             console.log("No info filled after draft order");
    //         }
    //     }
    // });

    // disable it for a reason
    // setInterval(function(){
    //     var length_of_element = $("#create_order_form_next_btn_step_1").length;
    //     if (length_of_element == 0)
    //         save_to_draft();
    //     else
    //         console.info("Order is not saved by user, waiting for this action...");
    // }, 10000);


    $("#create_order_form").submit(function(e){
        
        e.preventDefault();
            let link_to_redirect_ = $("#link_to_redirect_").val();
            var form_data = new FormData(document.getElementById('create_order_form'));
            form_data.append('cards', JSON.stringify(cards));
            // console.log(JSON.stringify(cards));
            form_data.append('step','step_insert');
            form_data.append('client_order_name', $("#client_order_name").val());
            form_data.append('knobs_tracker', JSON.stringify(knobs_tracker));
            form_data.append('keep_flow_tracker', JSON.stringify(keep_flow_tracker));

                    $.ajax({
                        url:$("#link_to_add_").val(), // add url for posting request
                        method:'POST',
                        data:form_data,
                        processData: false,  // Important: Don't process the data
                        contentType: false,  // Important: Don't set content type (automatically set to multipart/form-data)
                        dataType: 'JSON',
                        success:function(data){
                            
                            if (data.success == 1){
                                
                                $("#create_order_form").remove();
                                $("#form_btn").hide();
                                Swal.fire(
                                        {
                                            title: window.page.good_job_title, 
                                            text: window.page.good_job_text,
                                            icon: 'success',
                                            showConfirmButton: false,
                                            timer: 5000
                                        }
                                );

                                setTimeout(function(){
                                    // location.reload();
                                    location.href = link_to_redirect_;
                                },5000);

                                // console.log(data);

                            }else{
                                    // console.log(data);
                                    Swal.fire(
                                    {
                                        title:window.page.error,
                                        text: window.page.general_error_msg,
                                        icon: 'warning',
                                        showConfirmButton: false,
                                        timer: 2000
                                    }
                            );  
                            }

                        }, //end success here

                        error: function(data){
                            console.log(data);
                        }
                    }); //end ajax call here
        // }
        // else{
        //     Swal.fire(
        //             {
        //                 title: "Error",
        //                 text: 'Some keepflow inputs are not selected yet',
        //                 icon: 'warning',
        //                 showConfirmButton: false,
        //                 timer: 2000
        //             }
        //     );
        // }
        // console.log(form_data);
        return false;
    });

    
    ///////// To add scroll down function /////////
        const $fileInput = $("#upload_file");
        console.log('I DID IT ............ ', $fileInput)

        // Customize button and placeholder text
        const buttonText = "Choose whatever";
        const placeholderText = "Your file has been chosen";
      
        // Use CSS pseudo-element styles for customization
        $fileInput.css({
          "--file-button-text": `"${buttonText}"`,
          "--file-placeholder-text": `"${placeholderText}"`,
        });


    document.addEventListener("DOMContentLoaded", function () {
        const fileInput = document.getElementById("upload_file");
      
        // Customize the button and placeholder text
        const buttonText = fileInput.getAttribute("data-button-text") || "Choose file";
        const placeholderText = fileInput.getAttribute("data-placeholder-text") || "No file chosen";
      
        // Update the styling via pseudo-elements for the file input
        fileInput.style.setProperty("--file-button-text", `"${buttonText}"`);
        fileInput.style.setProperty("--file-placeholder-text", `"${placeholderText}"`);
      });
      


// $("input[name=nh]").on("focus", function() {
//     $(this).on("keydown", function(event) {
//       if (event.keyCode === 38 || event.keyCode === 40) {
//         event.preventDefault();
//       }
//     });
//   });

}); //end ready here
